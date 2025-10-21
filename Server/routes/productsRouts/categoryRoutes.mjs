import express from "express";
import {
  addCategory,
  fetchAllCategories,
  fetchCategoryById,
  editCategory,
  removeCategory,
} from "../../controllers/productsControllers/categoryController.mjs";

const router = express.Router();

// POST - Create category
router.post("/add", addCategory);

// GET - All categories
router.get("/get", fetchAllCategories);

// GET - Single category by ID
router.get("/get/:id", fetchCategoryById);

// PUT - Update category
router.put("/update/:id", editCategory);

// DELETE - Remove category
router.delete("/delete/:id", removeCategory);

export default router;
