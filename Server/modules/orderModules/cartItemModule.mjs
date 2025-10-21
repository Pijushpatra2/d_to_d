import pool from "../../utils/db.js";

// ✅ Create Cart Item
export const createCartItem = async (cartItemData) => {
  const { cart_id, product_variant_id, quantity } = cartItemData;
  const [result] = await pool.query(
    "INSERT INTO cart_items (cart_id, product_variant_id, quantity) VALUES (?, ?, ?)",
    [cart_id, product_variant_id, quantity]
  );
  return { id: result.insertId, ...cartItemData };
};

// ✅ Get all items in a specific cart
export const getCartItemsByCartId = async (cart_id) => {
  const [rows] = await pool.query(
    `SELECT ci.id, ci.quantity, 
            pv.id AS product_variant_id, pv.variant_name, pv.price, pv.stock,
            p.id AS product_id, p.title AS product_title, p.image
     FROM cart_items ci
     JOIN product_variants pv ON ci.product_variant_id = pv.id
     JOIN products p ON pv.product_id = p.id
     WHERE ci.cart_id = ?`,
    [cart_id]
  );
  return rows;
};

// ✅ Get Cart + Items by user_id
export const getCartByUserId = async (user_id) => {
  // 1. Find cart of the user
  const [cartRows] = await pool.query("SELECT * FROM cart WHERE user_id = ?", [user_id]);
  if (cartRows.length === 0) return null;

  const cart = cartRows[0];

  // 2. Fetch cart items with product + variant details
  const [items] = await pool.query(
    `SELECT ci.id, ci.quantity,
            pv.id AS product_variant_id, pv.variant_name, pv.price, pv.stock,
            p.id AS product_id, p.title AS product_title, p.image
     FROM cart_items ci
     JOIN product_variants pv ON ci.product_variant_id = pv.id
     JOIN products p ON pv.product_id = p.id
     WHERE ci.cart_id = ?`,
    [cart.id]
  );

  return { ...cart, items };
};


// ✅ Update Cart Item Quantity
export const updateCartItem = async (id, quantity) => {
  const [result] = await pool.query(
    "UPDATE cart_items SET quantity = ? WHERE id = ?",
    [quantity, id]
  );
  return result.affectedRows > 0;
};

// ✅ Delete Cart Item
export const deleteCartItem = async (id) => {
  const [result] = await pool.query("DELETE FROM cart_items WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
