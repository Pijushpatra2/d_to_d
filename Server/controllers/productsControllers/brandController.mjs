import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../../modules/productsModules/brandModule.mjs";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../utils/s3.js"; // AWS S3 v3 client
import dotenv from "dotenv";

dotenv.config();

// ✅ Add Brand
export const addBrand = async (req, res) => {
  try {
    const image_url = req.file ? req.file.location : null;

    const result = await createBrand({
      ...req.body,
      image_url,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    console.error("Controller Error (addBrand):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get All Brands
export const fetchAllBrands = async (req, res) => {
  try {
    const result = await getAllBrands();
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchAllBrands):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get Brand by ID
export const fetchBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getBrandById(id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (fetchBrandById):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update Brand (with S3 image replace)
export const editBrand = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing brand to get old image URL
    const existing = await getBrandById(id);
    if (!existing.success) {
      return res.status(404).json(existing);
    }

    let image_url = existing.data.image_url;

    // If a new file is uploaded, replace it in S3
    if (req.file) {
      image_url = req.file.location;

      // Delete old image from S3
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
            console.log("🗑️ Old image deleted from S3:", oldKey);
          } catch (err) {
            console.error("⚠️ Error deleting old image:", err.message);
          }
        }
      }
    }

    const result = await updateBrand(id, {
      ...req.body,
      image_url,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (editBrand):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete Brand (with S3 image cleanup)
export const removeBrand = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing brand
    const existing = await getBrandById(id);
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
          console.log("🗑️ Image deleted from S3 on brand delete:", oldKey);
        } catch (err) {
          console.error("⚠️ Error deleting brand image from S3:", err.message);
        }
      }
    }

    const result = await deleteBrand(id);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller Error (removeBrand):", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
