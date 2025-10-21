import pool from "../../utils/db.js";

// Create Order Item
export const createOrderItem = async (itemData) => {
  try {
    const { order_id, product_variant_id, quantity, price } = itemData;

    // Insert order item
    const [result] = await pool.query(
      `INSERT INTO order_items (order_id, product_variant_id, quantity, price) VALUES (?,?,?,?)`,
      [order_id, product_variant_id, quantity, price]
    );

    return { id: result.insertId, ...itemData };
  } catch (error) {
    throw error;
  }
};

// Get All Order Items
export const getAllOrderItems = async () => {
  try {
    const [rows] = await pool.query(`SELECT * FROM order_items`);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get Order Item by ID
export const getOrderItemById = async (id) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM order_items WHERE id = ?`, [
      id,
    ]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

// Get Order Items by Order ID (important for showing order details)
export const getOrderItemsByOrderId = async (order_id) => {
  try {
    const [rows] = await pool.query(
      `SELECT oi.*, pv.sku, pv.color, pv.size 
       FROM order_items oi
       JOIN product_variants pv ON oi.product_variant_id = pv.id
       WHERE oi.order_id = ?`,
      [order_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update Order Item
export const updateOrderItem = async (id, itemData) => {
  try {
    const { quantity, price } = itemData;
    await pool.query(
      `UPDATE order_items SET quantity = ?, price = ? WHERE id = ?`,
      [quantity, price, id]
    );
    return { id, ...itemData };
  } catch (error) {
    throw error;
  }
};

// Delete Order Item
export const deleteOrderItem = async (id) => {
  try {
    await pool.query(`DELETE FROM order_items WHERE id = ?`, [id]);
    return { message: "Order item deleted successfully" };
  } catch (error) {
    throw error;
  }
};
 