import { Op } from "sequelize";
import fs from "fs";

// import user module here
import Blog from "../models/blog.js";
import User from "../models/user.js";

function cb() {}

// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.findAll({
    order: [["createdAt", "DESC"]],
    include: User,
  });

  res.status(200).json(blogs);
};

export const getUserBlogs = async (req, res) => {
  const blogs = await Blog.findAll({
    where: {
      UserId: req.user.id,
    },
    order: [["createdAt", "DESC"]],
    include: User,
  });

  res.status(200).json(blogs);
};

// GET DETAIL BLOG
export const getBlog = async (req, res) => {
  console.log(req.params.id);
  const blog = await Blog.findOne({
    where: {
      id: req.params.id,
    },
    include: User,
  });
  if (blog) {
    return res.status(200).json({ status: true, blog });
  } else {
    return res.status(400).json({ status: false, message: "No blog found" });
  }
};

// CREATE A BLOG
export const createBlog = async (req, res) => {
  try {
    const title = req.body.title;
    const userId = req.body.UserId;
    const desc = req.body.desc;

    if (title == null || title == "")
      return res.status(400).json({
        message: "Please fill blog title.",
        status: false,
      });

    if (desc == "" || desc == null)
      return res.status(400).json({
        message: "Please fill blog description.",
        status: false,
      });

    if (!req.file) {
      const blog = new Blog(req.body);
      await blog.save();
      return res.status(200).json({ status: true, blog });
    } else {
      const blog = new Blog({
        title: title,
        desc: desc,
        UserId: userId,
        blog_image: req.file.path,
      });
      await blog.save();
      return res.status(200).json({ status: true, blog });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("error has occurred");
  }
};

// UPDATE A BLOG
export const updateBlog = async (req, res) => {
  try {
    const title = req.body.title;
    const desc = req.body.desc;

    if (title == null || title == "")
      return res.status(400).json({
        message: "Please fill blog title.",
        status: false,
      });

    if (desc == "" || desc == null)
      return res.status(400).json({
        message: "Please fill blog description.",
        status: false,
      });

    const blog = await Blog.findByPk(req.params.id);
    const userId = req.user.id;

    if (userId != blog.UserId)
      return res.status(401).json({
        message: "You are not the owner of the blog, you can not edit it",
        status: false,
      });

    if (req.file) {
      // for deleting the blog image in src/blog_image folder
      if (blog.blog_image != "") fs.unlink(blog.blog_image, cb);
      blog.blog_image = req.file.path;
    }

    blog.title = title;
    blog.desc = desc;
    await blog.save();

    return res.status(200).json({ status: true, blog });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error occurred" });
  }
};

// DELETE A BLOG
export const deleteBlog = async (req, res) => {
  try {
    const checkBlog = await Blog.findByPk(req.params.id);
    const userId = req.user.id;

    // for deleting the blog image in src/blog_image folder
    if (checkBlog.blog_image != "") fs.unlink(checkBlog.blog_image, cb);

    if (userId != checkBlog.UserId)
      return res.status(401).json({
        message: "You are not the owner of the blog, you can not delete it",
        status: false,
      });

    await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res
      .status(200)
      .json({ status: true, message: "Blog id deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Some error occurred", status: false });
  }
};

// SEARCH TOURISM
export const searchBlog = async (req, res) => {
  const search = req.query.q;

  const blog = await Blog.findAll({
    where: {
      title: {
        [Op.like]: `%${search}%`,
      },
    },
  });

  res.status(200).json(blog);
};
