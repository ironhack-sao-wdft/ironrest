const express = require("express");
const Category = require("../models/Category");
const slugify = require("slugify");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
} = require("../common-middleware/index");

// Crud - Create
// router.post("/category/create", requireSignin, adminMiddleware, (req, res) => {
router.post("/category/create", (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
});

// cRud - Read
router.get("/category/get", async (req, res) => {
  try {
    console.log("ei ta funfando");
    const categories = await Category.find();
    console.log(categories);
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
