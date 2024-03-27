import express from "express";
import multer from "multer";

import { verifyToken } from "../verifyToken.js";

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/blog_image");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

// IMPORT USER BUILT MODULE HERE
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  searchBlog,
  getUserBlogs,
} from "../controllers/blog.js";

// GET ALL BLOG
router.get("/", getAllBlogs);

// GET DETAIL BLOG
router.get("/:id", getBlog);

// GET USER BLOGS
router.get("/blogs/my-blogs", verifyToken, getUserBlogs);

// CREATE A BLOG
router.post("/", upload.single("blog_image"), verifyToken, createBlog);

// UPDATE A BLOG
router.put("/:id", upload.single("blog_image"), verifyToken, updateBlog);

// DELETE A BLOG
router.delete("/:id", verifyToken, deleteBlog);

// SEARCH BLOG
router.get("/search/blog", searchBlog);

export default router;
