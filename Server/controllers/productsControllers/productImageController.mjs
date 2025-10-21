import {
  createProductImage,
  getProductImagesByProductId,
  getProductImageById,
  updateProductImage,
  deleteProductImage
} from "../../modules/productsModules/productImageModule.mjs";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../utils/s3.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Add Product Image
export const addProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const data = {
      product_id: req.body.product_id,
      image_url: req.file.location, // 👈 S3 URL
      alt_text: req.body.alt_text || null,
      is_primary: req.body.is_primary === "true" ? true : false,
    };

    const result = await createProductImage(data);
    if (!result.success) return res.status(400).json(result);

    res.status(201).json({
      success: true,
      message: "Product image uploaded successfully",
      image: { id: result.id, ...data },
    });
  } catch (error) {
    console.error("Controller Error (addProductImage):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get All Images for a Product
export const fetchProductImagesByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await getProductImagesByProductId(product_id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchProductImagesByProductId):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get Single Image
export const fetchProductImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getProductImageById(id);
    if (!result.success) return res.status(404).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchProductImageById):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update Product Image (with S3 replace)
export const editProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing image
    const existing = await getProductImageById(id);
    if (!existing.success) return res.status(404).json(existing);

    let image_url = existing.data.image_url;

    // If a new file is uploaded, replace in S3
    if (req.file) {
      image_url = req.file.location;

      if (existing.data.image_url) {
        const oldKey = existing.data.image_url.split(
          `${process.env.AWS_S3_BUCKET}/`
        )[1];
        if (oldKey) {
          try {
            await s3.send(
              new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: oldKey,
              })
            );
            console.log("🗑️ Old product image deleted from S3:", oldKey);
          } catch (err) {
            console.error("⚠️ Error deleting old product image:", err.message);
          }
        }
      }
    }

    const result = await updateProductImage(id, {
      ...req.body,
      image_url,
    });

    if (!result.success) return res.status(400).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (editProductImage):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete Product Image (with S3 cleanup)
export const removeProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing image
    const existing = await getProductImageById(id);
    if (existing.success && existing.data.image_url) {
      const oldKey = existing.data.image_url.split(
        `${process.env.AWS_S3_BUCKET}/`
      )[1];
      if (oldKey) {
        try {
          await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_S3_BUCKET,
              Key: oldKey,
            })
          );
          console.log("🗑️ Product image deleted from S3:", oldKey);
        } catch (err) {
          console.error("⚠️ Error deleting product image from S3:", err.message);
        }
      }
    }

    const result = await deleteProductImage(id);
    if (!result.success) return res.status(404).json(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (removeProductImage):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
