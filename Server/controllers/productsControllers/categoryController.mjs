import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../modules/productsModules/categoryModule.mjs";

// ✅ Create new category
export const addCategory = async (req, res) => {
  try {
    const result = await createCategory(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Controller Error (addCategory):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all categories
export const fetchAllCategories = async (req, res) => {
  try {
    const result = await getAllCategories();
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchAllCategories):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get category by ID
export const fetchCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCategoryById(id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchCategoryById):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update category
export const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCategory(id, req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (editCategory):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete category
export const removeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCategory(id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (removeCategory):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
