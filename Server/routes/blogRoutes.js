import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogControllers.js";
import { blogUpload } from "../middleware/fileUpload.js";

const router = express.Router();

// Public Routes
router.get("/get/all", getAllBlogs);
router.get("/get/:id", getBlogById);

// Protected Routes with Image Upload
const blogUploads = blogUpload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "coverImg", maxCount: 1 },
  { name: "bodyImg", maxCount: 1 },
]);

router.post("/add", blogUploads, createBlog);
router.put("/update/:id", blogUploads, updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
