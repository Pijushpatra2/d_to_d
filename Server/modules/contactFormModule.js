import { pool } from "../utils/db.js";

// 🔹 Submit a new contact form
export function submitContactForm(formData) {
  const { name, email, phone, subject, message } = formData;
  const sql = `
    INSERT INTO contact_form_details (name, email, phone, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    pool.query(sql, [name, email, phone, subject, message], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

// 🔹 Get all contact form entries
export function getAllContactForms() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM contact_form_details ORDER BY submitted_at DESC";
    pool.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// 🔹 Get a contact form entry by ID
export function getContactFormById(id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM contact_form_details WHERE id = ?";
    pool.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
}

// 🔹 Delete a contact form entry by ID
export function deleteContactFormById(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM contact_form_details WHERE id = ?";
    pool.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
