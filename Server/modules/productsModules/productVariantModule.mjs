import pool from "../../utils/db.js ";

// Create product variant
export const createProductVariant = async (variantData) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO product_variants (product_id, sku, color, size, stock, price) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        variantData.product_id,
        variantData.sku,
        variantData.color,
        variantData.size,
        variantData.stock,
        variantData.price,
      ]
    );
    return { id: result.insertId, ...variantData };
  } catch (error) {
    throw error;
  }
};

// Get all variants
export const getAllProductVariants = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM product_variants");
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get variant by ID
export const getProductVariantById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM product_variants WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};


// Get variants by product ID
export const getProductVariantsByProductId = async (product_id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM product_variants WHERE product_id = ?", 
      [product_id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update variant
export const updateProductVariant = async (id, variantData) => {
  try {
    await pool.query(
      `UPDATE product_variants 
       SET product_id = ?, sku = ?, color = ?, size = ?, stock = ?, price = ?
       WHERE id = ?`,
      [
        variantData.product_id,
        variantData.sku,
        variantData.color,
        variantData.size,
        variantData.stock,
        variantData.price,
        id,
      ]
    );
    return { id, ...variantData };
  } catch (error) {
    throw error;
  }
};

// Delete variant
export const deleteProductVariant = async (id) => {
  try {
    await pool.query("DELETE FROM product_variants WHERE id = ?", [id]);
    return { message: "Product variant deleted successfully" };
  } catch (error) {
    throw error;
  }
};
