import express from "express";
import {
  addProductVariant,
  fetchAllProductVariants,
  fetchProductVariantById,
  fetchProductVariantsByProductId, // Add this import
  editProductVariant,
  removeProductVariant,
} from "../../controllers/productsControllers/productVariantController.mjs";

const router = express.Router();

// Routes
router.post("/add", addProductVariant);                    // Create
router.get("/get", fetchAllProductVariants);               // Get all
router.get("/get/:id", fetchProductVariantById);           // Get by ID
router.get("/get/product/:product_id", fetchProductVariantsByProductId); // Get by Product ID
router.put("/update/:id", editProductVariant);             // Update (fixed typo from "upload" to "update")
router.delete("/delete/:id", removeProductVariant);        // Delete

export default router;