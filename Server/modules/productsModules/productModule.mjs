import pool from "../../utils/db.js"; // MySQL connection

// ✅ Create Product
export const createProduct = async (data) => {
     console.log("👉 Incoming product data:", data); // debug log

  try {
    const {
      name,
      slug,
      description,
      price,
      stock,
      category_id,
      brand_id,
      
    } = data;

    const [result] = await pool.query(
      `INSERT INTO products (name, slug, description, price, stock, category_id, brand_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, price, stock, category_id, brand_id || null]
    );

    return { success: true, id: result.insertId };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get All Products with Category + Brand
export const getAllProducts = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
    `);
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get Single Product by ID
export const getProductById = async (id) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name AS category_name, b.name AS brand_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN brands b ON p.brand_id = b.id
      WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return { success: false, message: "Product not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Update Product
export const updateProduct = async (id, data) => {
  try {
    const {
      name,
      slug,
      description,
      price,
      stock,
      category_id,
      brand_id,
      
    } = data;

    const [result] = await pool.query(
      `UPDATE products 
       SET name=?, slug=?, description=?, price=?, stock=?, category_id=?, brand_id=?
       WHERE id=?`,
      [name, slug, description, price, stock, category_id, brand_id || null, id]
    );

    if (result.affectedRows === 0) {
      return { success: false, message: "Product not found or not updated" };
    }

    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Delete Product
export const deleteProduct = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);

    if (result.affectedRows === 0) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: error.message };
  }
};
