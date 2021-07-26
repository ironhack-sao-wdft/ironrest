const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const PostModel = require("../models/Post.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Create new post
router.post(
  "/post",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;
      const newPost = await PostModel.create({
        userId: loggedInUser._id,
        ...req.body,
      });

      const updateUser = await UserModel.findOneAndUpdate(
        {
          _id: loggedInUser._id,
        },
        { $push: { posts: newPost._id } },
        { new: true }
      );
      return res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
  }
);

// Get all posts
router.get(
  "/post",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const loggedInUser = req.currentUser;

      const posts = await PostModel.find({ userId: loggedInUser._id });

      if (!posts) {
        return res
          .status(400)
          .json({ error: "Você ainda não tem nenhum post." });
      }

      return res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  }
);

// Get especific post
router.get(
  "/post/:id",
  isAuthenticated,

  async (req, res, next) => {
    try {
      const { id } = req.params;

      const post = await PostModel.findOne({ _id: id });

      return res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  }
);

// Update post
router.put(
  "/post/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        { new: true }
      );

      return res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  }
);

// Delete post
router.delete(
  "/post/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletionResult = await PostModel.deleteOne({ _id: id });

      if (deletionResult.n < 1) {
        return res.status(400).json({ error: "Post não encontrado." });
      }

      return res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
