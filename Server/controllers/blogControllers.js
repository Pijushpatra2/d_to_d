import * as blogmodules from "../modules/blogModules.js";

// Helper to safely parse hyperlinks
const parseHyperlinks = (input) => {
  if (Array.isArray(input)) return input;
  try {
    const parsed = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    return typeof input === "string" && input.trim() !== "" ? [input] : [];
  }
};

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const {
      title,
      subheading,
      content,
      conclusion,
      hyperlinks
    } = req.body;

    const thumbnailFile = req.files?.thumbnail?.[0] || null;
    const coverImgFile = req.files?.coverImg?.[0] || null;
    const bodyImgFile = req.files?.bodyImg?.[0] || null;

    const thumbnail = thumbnailFile ? `/uploads/blogs/${thumbnailFile.filename}` : null;
    const coverImg = coverImgFile ? `/uploads/blogs/${coverImgFile.filename}` : null;
    const bodyImg = bodyImgFile ? `/uploads/blogs/${bodyImgFile.filename}` : null;

    const hyperlinksArray = parseHyperlinks(hyperlinks);

    const newPost = await blogmodules.createBlogPost(
      title,
      subheading,
      content,
      conclusion,
      hyperlinksArray,
      thumbnail,
      coverImg,
      bodyImg
    );

    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogmodules.getAllBlogPosts();
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    // console.error("Error while fetching all blogs:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a blog post by ID
export const getBlogById = async (req, res) => {
  try {
    const postId = req.params.id;
    const blog = await blogmodules.getBlogPostById(postId);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    res.status(200).json({ success: true, blog });
  } catch (err) {
    // console.error(`Error fetching blog post ID ${req.params.id}:`, err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      title,
      subheading,
      content,
      conclusion,
      hyperlinks
    } = req.body;

    const thumbnailFile = req.files?.thumbnail?.[0] || null;
    const coverImgFile = req.files?.coverImg?.[0] || null;
    const bodyImgFile = req.files?.bodyImg?.[0] || null;

    const updatedData = {
      title,
      subheading,
      content,
      conclusion,
      hyperlinks: parseHyperlinks(hyperlinks),
    };

    if (thumbnailFile) {
      updatedData.thumbnail = `/uploads/blogs/${thumbnailFile.filename}`;
    }
    if (coverImgFile) {
      updatedData.coverImg = `/uploads/blogs/${coverImgFile.filename}`;
    }
    if (bodyImgFile) {
      updatedData.bodyImg = `/uploads/blogs/${bodyImgFile.filename}`;
    }

    await blogmodules.updateBlogPost(postId, updatedData);

    res.status(200).json({ success: true, message: "Blog post updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Delete a blog post
export const deleteBlog = async (req, res) => {
  try {
    const postId = req.params.id;
    await blogmodules.deleteBlogPost(postId);
    res.status(200).json({ success: true, message: "Blog post deleted successfully" });
  } catch (err) {
    // console.error(`Error deleting blog post ID ${req.params.id}:`, err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
