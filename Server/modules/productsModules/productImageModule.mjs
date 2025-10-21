import pool from "../../utils/db.js";

// ✅ Add Product Image
export const createProductImage = async (data) => {
  try {
    const { product_id, image_url, alt_text, is_primary } = data;
    const [result] = await pool.query(
      `INSERT INTO product_images (product_id, image_url, alt_text, is_primary)
       VALUES (?, ?, ?, ?)`,
      [product_id, image_url, alt_text || null, is_primary || false]
    );
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error("Error creating product image:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get All Images for a Product
export const getProductImagesByProductId = async (product_id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM product_images WHERE product_id = ?`,
      [product_id]
    );
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching product images:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get Single Image by ID
export const getProductImageById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM product_images WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) {
      return { success: false, message: "Image not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error("Error fetching product image:", error);
    return { success: false, message: error.message };
  }
};



// ✅ Update Product Image
export const updateProductImage = async (id, data) => {
  try {
    const { image_url, alt_text, is_primary } = data;
    const [result] = await pool.query(
      `UPDATE product_images 
       SET image_url=?, alt_text=?, is_primary=?
       WHERE id=?`,
      [image_url, alt_text || null, is_primary || false, id]
    );
    if (result.affectedRows === 0) {
      return { success: false, message: "Image not found or not updated" };
    }
    return { success: true, message: "Product image updated successfully" };
  } catch (error) {
    console.error("Error updating product image:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Delete Product Image
export const deleteProductImage = async (id) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM product_images WHERE id=?`,
      [id]
    );
    if (result.affectedRows === 0) {
      return { success: false, message: "Image not found" };
    }
    return { success: true, message: "Product image deleted successfully" };
  } catch (error) {
    console.error("Error deleting product image:", error);
    return { success: false, message: error.message };
  }
};
