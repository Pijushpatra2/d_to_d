import { check, validationResult } from "express-validator";
import { submitContactForm, getAllContactForms, getContactFormById, deleteContactFormById } from "../modules/contactFormModule.js";
import { notifyAdmin, notifyUser } from "../middleware/mailService.js";
import validator from "validator";

// Disposable email blocker
const disposableDomains = ["mailinator.com", "10minutemail.com", "tempmail.com"];
const isDisposableEmail = (email) => {
  const domain = email.split("@")[1];
  return disposableDomains.includes(domain);
};

// GET /api/contact
export async function getAllForms(req, res) {
  try {
    const forms = await getAllContactForms();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact forms" });
  }
}

// GET /api/contact/:id
export async function getFormById(req, res) {
  try {
    const form = await getContactFormById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact form" });
  }
}

// DELETE /api/contact/:id
export async function deleteFormById(req, res) {
  try {
    await deleteContactFormById(req.params.id);
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete contact form" });
  }
}

// POST /api/contact/submit
// export const submitForm = async (req, res) => {
//   // Validate the request
//   await Promise.all([
//     check("name").notEmpty().withMessage("Name is required").run(req),
//     check("email").isEmail().withMessage("A valid email is required").run(req),
//     check("phone").notEmpty().withMessage("Phone is required").isMobilePhone().withMessage("Invalid phone").run(req),
//     check("subject").notEmpty().withMessage("Subject is required").run(req),
//     check("message").notEmpty().withMessage("Message is required").run(req),
//   ]);

//   // Check result
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       message: "Validation failed",
//       errors: errors.array(),
//     });
//   }

//   try {
//     await submitContactForm(req.body);
//     res.status(200).json({ message: "Form submitted successfully!" });
//   } catch (err) {
//     console.error("Submit Error:", err);
//     res.status(500).json({ message: "Failed to submit contact form" });
//   }
// };




export const submitForm = async (req, res) => {
  await Promise.all([
    check("name").notEmpty().withMessage("Name is required").run(req),
    check("email").isEmail().withMessage("Valid email is required").run(req),
    check("phone").notEmpty().withMessage("Phone number is required").run(req),
    check("subject").notEmpty().withMessage("Subject is required").run(req),
    check("message").notEmpty().withMessage("Message is required").run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }

  const { email } = req.body;

  // Block disposable emails
  if (isDisposableEmail(email)) {
    return res.status(400).json({
      message: "Disposable or temporary email addresses are not allowed.",
    });
  }

  try {
    // Save to DB
    await submitContactForm(req.body);

    // Send notification emails
    await notifyAdmin(req.body);
    await notifyUser(req.body);

    res.status(200).json({ message: "Form submitted and emails sent successfully!" });
  } catch (err) {
    console.error("SubmitForm Error:", err);
    res.status(500).json({ message: "Failed to submit contact form." });
  }
};