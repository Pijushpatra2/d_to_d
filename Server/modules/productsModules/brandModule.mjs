import pool from "../../utils/db.js"; // MySQL connection

// ✅ Create Brand
export const createBrand = async (data) => {
  try {
    const { name, slug, image_url } = data;
    const [result] = await pool.query(
      "INSERT INTO brands (name, slug, image_url) VALUES (?, ?, ?)",
      [name, slug, image_url || null]
    );
    return { success: true, id: result.insertId };
  } catch (error) {
    console.error("Error creating brand:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get All Brands
export const getAllBrands = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM brands");
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Get Brand by ID
export const getBrandById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM brands WHERE id = ?", [id]);
    if (rows.length === 0) {
      return { success: false, message: "Brand not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    console.error("Error fetching brand by ID:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Update Brand
export const updateBrand = async (id, data) => {
  try {
    const { name, slug, image_url } = data;
    const [result] = await pool.query(
      "UPDATE brands SET name = ?, slug = ?, image_url = ? WHERE id = ?",
      [name, slug, image_url || null, id]
    );
    if (result.affectedRows === 0) {
      return { success: false, message: "Brand not found or not updated" };
    }
    return { success: true, message: "Brand updated successfully" };
  } catch (error) {
    console.error("Error updating brand:", error);
    return { success: false, message: error.message };
  }
};

// ✅ Delete Brand
export const deleteBrand = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM brands WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return { success: false, message: "Brand not found" };
    }
    return { success: true, message: "Brand deleted successfully" };
  } catch (error) {
    console.error("Error deleting brand:", error);
    return { success: false, message: error.message };
  }
};



// {
//   "name": "Puma",
//   "slug": "puma",
//   "image_url": "https://example.com/images/puma.png"
// }
