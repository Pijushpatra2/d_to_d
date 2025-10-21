import { pool } from "../utils/db.js";

// Create a new blog post
export const createBlogPost = (
  title,
  subheading,
  content,
  conclusion,
  hyperlinks = [],
  thumbnail = null,
  coverImg = null,
  bodyImg = null
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO blog (
        title, subheading, content, conclusion,
        hyperlinks, published_date,
        thumbnail, coverImg, bodyImg
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const serializedLinks = JSON.stringify(hyperlinks);
    const publishedDate = new Date();

    console.log("Creating blog post with images:", {
      title,
      subheading,
      content,
      conclusion,
      hyperlinks,
      publishedDate,
      thumbnail,
      coverImg,
      bodyImg,
    });

    pool.query(
      sql,
      [
        title,
        subheading,
        content,
        conclusion,
        serializedLinks,
        publishedDate,
        thumbnail,
        coverImg,
        bodyImg,
      ],
      (err, result) => {
        if (err) {
          // console.error("Error creating blog post:", err);
          return reject(err);
        }
        // console.log("Blog post created with ID:", result.insertId);
        resolve({
          postId: result.insertId,
          title,
          subheading,
          content,
          conclusion,
          hyperlinks,
          publishedDate,
          thumbnail,
          coverImg,
          bodyImg,
        });
      }
    );
  });
};

// Get all blog posts
export const getAllBlogPosts = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM blog";
    // console.log("Fetching all blog posts...");

    pool.query(sql, (err, result) => {
      if (err) {
        // console.error("Error fetching blog posts:", err);
        return reject(err);
      }

      const posts = result.map((post) => ({
        ...post,
        hyperlinks: JSON.parse(post.hyperlinks || "[]"),
      }));

      // console.log(`Fetched ${posts.length} blog posts.`);
      resolve(posts);
    });
  });
};

// Get a blog post by ID
export const getBlogPostById = (postId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM blog WHERE blog_id = ?";
    // console.log("Fetching blog post with ID:", postId);

    pool.query(sql, [postId], (err, result) => {
      if (err) {
        // console.error("Error fetching blog post:", err);
        return reject(err);
      }
      if (result.length === 0) {
        // console.warn("No blog post found with ID:", postId);
        return resolve(null);
      }

      const post = result[0];
      post.hyperlinks = JSON.parse(post.hyperlinks || "[]");

      // console.log("Fetched blog post:", post);
      resolve(post);
    });
  });
};

// Update a blog post by ID
export const updateBlogPost = (
  postId,
  {
    title,
    subheading,
    content,
    conclusion,
    hyperlinks,
    thumbnail = null,
    coverImg = null,
    bodyImg = null,
  }
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      UPDATE blog
      SET title = ?, subheading = ?, content = ?, conclusion = ?,
          hyperlinks = ?, thumbnail = ?, coverImg = ?, bodyImg = ?
      WHERE blog_id = ?
    `;

    const serializedLinks = JSON.stringify(hyperlinks || []);

    console.log("Updating blog post:", {
      postId,
      title,
      subheading,
      content,
      conclusion,
      hyperlinks,
      thumbnail,
      coverImg,
      bodyImg,
    });

    pool.query(
      sql,
      [
        title,
        subheading,
        content,
        conclusion,
        serializedLinks,
        thumbnail,
        coverImg,
        bodyImg,
        postId,
      ],
      (err, result) => {
        if (err) {
          // console.error("Error updating blog post:", err);
          return reject(err);
        }
        // console.log("Blog post updated:", result);
        resolve(result);
      }
    );
  });
};

// Delete a blog post by ID
export const deleteBlogPost = (postId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM blog WHERE blog_id = ?";
    // console.log("Deleting blog post with ID:", postId);

    pool.query(sql, [postId], (err, result) => {
      if (err) {
        // console.error("Error deleting blog post:", err);
        return reject(err);
      }
      // console.log("Blog post deleted:", result);
      resolve(result);
    });
  });
};
