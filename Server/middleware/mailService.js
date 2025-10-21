import nodemailer from "nodemailer";
import { getAdminEmailTemplate, getUserEmailTemplate } from "./email-templates.js";

// 🔐 Create the transporter using webmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🔹 Notify Admin of contact form submission
export const notifyAdmin = async (formData) => {
  const { subject } = formData;

  const mailOptions = {
    from: `"Evernal Group Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${subject}`,
    html: getAdminEmailTemplate(formData),
  };

  return transporter.sendMail(mailOptions);
};

// 🔹 Send confirmation email to user
export const notifyUser = async (formData) => {
  const { email } = formData;

  const mailOptions = {
    from: `"Evernal Group" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Thank you for contacting Evernal Group - We'll be in touch soon!`,
    html: getUserEmailTemplate(formData),
  };

  return transporter.sendMail(mailOptions);
};

// 🔹 Property Inquiry Emails (admin + user)
export const notifyPropertyInquiry = async (formData) => {
  const { email, propertyTitle, inquiryType } = formData;

  const adminMailOptions = {
    from: `"Evernal Group Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Property Inquiry: ${propertyTitle}`,
    html: getAdminEmailTemplate({
      ...formData,
      subject: `Property Inquiry - ${propertyTitle}`,
      message: `Inquiry Type: ${inquiryType}\n\nProperty: ${propertyTitle}\n\nMessage: ${formData.message || "No additional message provided."}`,
    }),
  };

  const userMailOptions = {
    from: `"Evernal Group" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Property Inquiry Received - ${propertyTitle}`,
    html: getUserEmailTemplate({
      ...formData,
      subject: `Property Inquiry for ${propertyTitle}`,
    }),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);
};

// 🔹 Seller Inquiry Emails (admin + user)
export const notifySellerInquiry = async (formData) => {
  const { email, propertyType, location } = formData;

  const adminMailOptions = {
    from: `"Evernal Group Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Seller Inquiry: ${propertyType} in ${location}`,
    html: getAdminEmailTemplate({
      ...formData,
      subject: `Sell Property - ${propertyType} in ${location}`,
      message: `Property Type: ${propertyType}\nLocation: ${location}\nExpected Price: ₹${formData.expectedPrice}\n\nAdditional Details: ${formData.description || "No additional details provided."}`,
    }),
  };

  const userMailOptions = {
    from: `"Evernal Group" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Property Listing Request Received - We'll Help You Sell!`,
    html: getUserEmailTemplate({
      ...formData,
      subject: `Property Listing for ${propertyType} in ${location}`,
    }),
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions),
  ]);
};
