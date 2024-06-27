import express from "express";
const router = express.Router();
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

// Get all or a few posts
router.get("/", getPosts);

// Get a single post by id
router.get("/:id", getPost);

// Create a new post
router.post("/", createPost);

// Update a post with a new title
router.put("/:id", updatePost);

// Delete a post by id
router.delete("/:id", deletePost);

export default router;
