import express from "express";
import {
  addBrand,
  fetchAllBrands,
  fetchBrandById,
  editBrand,
  removeBrand,
} from "../../controllers/productsControllers/brandController.mjs";
import { uploadToS3 } from "../../middleware/fileUpload.mjs";

const router = express.Router();

// Middleware instance for brands
const brandUpload = uploadToS3("brands");

// POST - Create brand
router.post("/add", (req, res, next) => {
  console.log("Incoming form-data:", req.body, req.files, req.file);
  next();
}, brandUpload.single("image"), addBrand);

// GET - All brands
router.get("/get", fetchAllBrands);

// GET - Single brand by ID
router.get("/get/:id", fetchBrandById);

// PUT - Update brand (optional image)
router.put("/update/:id", brandUpload.single("image"), editBrand);

// DELETE - Remove brand
router.delete("/delete/:id", removeBrand);

export default router;
