import pool from "../../utils/db.js"; // your MySQL connection file

// ✅ Create Category
export const createCategory = async (data) => {
  try {
    const { name, slug, parent_id } = data;
    const [result] = await pool.query(
      "INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, ?)",
      [name, slug, parent_id || null]
    );
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get All Categories
export const getAllCategories = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories");
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get Category by ID
export const getCategoryById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    if (rows.length === 0) {
      return { success: false, message: "Category not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Update Category
export const updateCategory = async (id, data) => {
  try {
    const { name, slug, parent_id } = data;
    const [result] = await pool.query(
      "UPDATE categories SET name = ?, slug = ?, parent_id = ? WHERE id = ?",
      [name, slug, parent_id || null, id]
    );
    if (result.affectedRows === 0) {
      return { success: false, message: "Category not found or not updated" };
    }
    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Delete Category
export const deleteCategory = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return { success: false, message: "Category not found" };
    }
    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: error.message };
  }
};
