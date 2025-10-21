import pool from "../../utils/db.js";

// Create Cart
export const createCart = async (user_id) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO cart (user_id) VALUES (?)`,
      [user_id]
    );
    return { id: result.insertId, user_id };
  } catch (error) {
    throw error;
  }
};

// Get All Carts
export const getAllCarts = async () => {
  try {
    const [rows] = await pool.query(`SELECT * FROM cart`);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get Cart by ID
export const getCartById = async (id) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM cart WHERE id = ?`, [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Get Cart by User ID (important for frontend)
export const getCartByUserId = async (user_id) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM cart WHERE user_id = ?`, [
      user_id,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Delete Cart
export const deleteCart = async (id) => {
  try {
    await pool.query(`DELETE FROM cart WHERE id = ?`, [id]);
    return { message: "Cart deleted successfully" };
  } catch (error) {
    throw error;
  }
};
