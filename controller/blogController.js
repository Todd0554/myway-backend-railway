import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// asyncHandler is used to simplify the syntax of the promise catch error handling
import asyncHandler from "express-async-handler";

// GET api/blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  if (blogs && blogs.length !== 0) {
    res.status(200).json(blogs);
  } else {
    res.status(404);
    throw new Error("No blogs found.");
  }
});

// GET api/blogs/:id
export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200);
    res.json(blog);
  }
});

// POST api/blogs
export const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    user: req.user,
    name: req.user.name,
    image: req.body.image,
    article: req.body.article,
    title: req.body.title,
  });
  const newBlog = await blog.save();
  res.status(201).json(newBlog);
});

// GET api/blogs/:userId/all
export const getBlogsByUserId = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.params.userId });
  if (blogs && blogs.length !== 0) {
    res.status(200);
    res.json(blogs);
  }
});

// DELETE api/blogs/:id
export const deleteBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  // console.log(blog.user)
  // console.log(req.user._id)
  if (blog) {
    if (req.user._id.toString() === blog.user.toString() || req.user.isAdmin) {
      await blog.remove();
      res.status(200);
      res.json({ message: "Blog removed successfully!" });
    } else {
      res.status(401);
      throw new Error("You are not authorized to delete this blog!");
    }
  }
});

// create comment for blog
// POST /api/blogs/:id/comments
// users
export const createBlogComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const createComment = {
      user: req.user._id,
      content,
      name: req.user.name,
    };
    blog.comments.push(createComment);
    blog.numComments = blog.comments.length;
    await blog.save();
    res.status(201).json({ message: "Successfully add comment." });
  }
});

// delete comment for blog
// DELETE /api/blogs/:id/comments/:commentId
// users
export const deleteBlogComment = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    const comment = await blog.comments.find(
      (comment) => comment._id.toString() === req.params.commentId.toString()
    );
    if (comment) {
      await comment.remove();
      blog.numComments = blog.comments.length;
      await blog.save();
      res.status(201).json({ message: "Successfully delete comment." });
    }
  }
});
