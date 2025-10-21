import pool from "../../utils/db.js";
import bcrypt from "bcryptjs";

// ✅ Create new user
export const createUser = async (data) => {
  try {
    const { name, email, password } = data;

    // Check if email exists
    const [existing] = await pool.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );
    if (existing.length > 0) {
      return { success: false, message: "Email already registered" };
    }

    const [result] = await pool.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );

    return {
      success: true,
      message: "User created successfully",
      id: result.insertId,
    };
  } catch (error) {
    return { success: false, message: "Error creating user", error: error.message };
  }
};

// ✅ Find user by email (for login)
export const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (rows.length === 0) {
      return { success: false, message: "User not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    return { success: false, message: "Error fetching user", error: error.message };
  }
};

// ✅ Get all users
export const getAllUsers = async () => {
  try {
    const [rows] = await pool.query(`SELECT id, name, email, created_at FROM users`);
    return { success: true, data: rows };
  } catch (error) {
    return { success: false, message: "Error fetching users", error: error.message };
  }
};

// ✅ Get user by ID
export const getUserById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, created_at FROM users WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return { success: false, message: "User not found" };
    return { success: true, data: rows[0] };
  } catch (error) {
    return { success: false, message: "Error fetching user", error: error.message };
  }
};

// ✅ Update user
export const updateUser = async (id, data) => {
  try {
    const { name, email, password } = data;
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result] = await pool.query(
      `UPDATE users 
       SET name = ?, email = ?, password = COALESCE(?, password) 
       WHERE id = ?`,
      [name, email, hashedPassword, id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "User not found or no changes made" };
    }

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: "Error updating user", error: error.message };
  }
};

// ✅ Delete user
export const deleteUser = async (id) => {
  try {
    const [result] = await pool.query(`DELETE FROM users WHERE id = ?`, [id]);
    if (result.affectedRows === 0) return { success: false, message: "User not found" };
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error deleting user", error: error.message };
  }
};
