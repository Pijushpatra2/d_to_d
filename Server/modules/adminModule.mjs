import pool from "../utils/db.js";

// ✅ Create new admin
export const createAdmin = async (data) => {
  try {
    const { name, email, password } = data;

    const [existing] = await pool.query(
      `SELECT id FROM admin_credentials WHERE email = ?`,
      [email]
    );
    if (existing.length > 0) {
      return { success: false, message: "Email already registered" };
    }


    const [result] = await pool.query(
      `INSERT INTO admin_credentials (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );

    return { success: true, message: "Admin created successfully", id: result.insertId };
  } catch (error) {
    return { success: false, message: "Error creating admin", error: error.message };
  }
};

// ✅ Find admin by email (for login)
export const getAdminByEmail = async (email) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM admin_credentials WHERE email = ?`, [email]);
    if (rows.length === 0) {
      return { success: false, message: "Admin not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    return { success: false, message: "Error fetching admin", error: error.message };
  }
};

// ✅ Get all admins
export const getAllAdmins = async () => {
  try {
    const [rows] = await pool.query(`SELECT id, name, email, created_at FROM admin_credentials`);
    return { success: true, data: rows };
  } catch (error) {
    return { success: false, message: "Error fetching admins", error: error.message };
  }
};

// ✅ Get admin by ID
export const getAdminById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, created_at FROM admin_credentials WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return { success: false, message: "Admin not found" };
    return { success: true, data: rows[0] };
  } catch (error) {
    return { success: false, message: "Error fetching admin", error: error.message };
  }
};

// ✅ Update admin
export const updateAdmin = async (id, data) => {
  try {
    const { name, email, password } = data;
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result] = await pool.query(
      `UPDATE admin_credentials SET name = ?, email = ?, password = COALESCE(?, password) WHERE id = ?`,
      [name, email, hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Admin not found or no changes made" };
    }

    return { success: true, message: "Admin updated successfully" };
  } catch (error) {
    return { success: false, message: "Error updating admin", error: error.message };
  }
};

// ✅ Delete admin
export const deleteAdmin = async (id) => {
  try {
    const [result] = await pool.query(`DELETE FROM admin_credentials WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return { success: false, message: "Admin not found" };
    return { success: true, message: "Admin deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting admin", error: error.message };
  }
};
