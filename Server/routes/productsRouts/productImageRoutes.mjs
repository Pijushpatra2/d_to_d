import express from "express";
import {
  addProductImage,
  fetchProductImagesByProductId,
  fetchProductImageById,
  editProductImage,
  removeProductImage
} from "../../controllers/productsControllers/productImageController.mjs";

import { uploadToS3 } from "../../middleware/fileUpload.mjs"; 


const router = express.Router();

const productImageUpload = uploadToS3("products");

// Upload single image to S3 inside "products" folder
router.post(
  "/add", productImageUpload.single("image"),   // 👈 expects field "image"
  addProductImage
);


// GET - All images for a product
router.get("/get/product/:product_id", fetchProductImagesByProductId);

// GET - Single image by ID
router.get("/get/:id", fetchProductImageById);

// PUT - Update image
router.put("/update/:id", uploadToS3("products").single("image"), editProductImage);

// DELETE - Remove image
router.delete("/delete/:id", removeProductImage);

export default router;
