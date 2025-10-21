import express from "express";
import {
  addProduct,
  fetchAllProducts,
  fetchProductById,
  editProduct,
  removeProduct
} from "../../controllers/productsControllers/productController.mjs";

const router = express.Router();

// POST - Create product
router.post("/add", addProduct);

// GET - All products
router.get("/get", fetchAllProducts);

// GET - Single product by ID
router.get("/get/:id", fetchProductById);

// PUT - Update product
router.put("/update/:id", editProduct);

// DELETE - Remove product
router.delete("/delete/:id", removeProduct);

export default router;
