const router = require("express").Router();
// const bcrypt = require("bcryptjs");

const ProductModel = require("../models/Product.model");
// const isAdmin = require("../middlewares/isAdmin");
// const isAuthenticated = require("../middlewares/isAuthenticated");
// const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Crud (CREATE) - HTTP POST: Criar um novo produto
router.post("/product", async (req, res, next) => {
  try {
    const product = await ProductModel.create(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
});

// Crud (READ) - HTTP GET: Ler a lista de produtos
router.get("/products", async (req, res, next) => {
  try {
    const products = await ProductModel.find();
    return res.status(201).json(products);
  } catch (err) {
    return next(err);
  }
});

// Crud (READ) - HTTP GET: Ler um produto único pelo ID
router.get("/product/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
});

// Crud (UPDATE) - HTTP PATCH: Update de um produto único pelo ID (altera alguns campos)

router.patch("/product/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    return next(err);
  }
});

// Crud (DELETE) - HTTP DELETE: Delete de um produto único pelo ID

router.delete("/product/:id", async (req, res, next) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    await product.remove();
    return res.status(200).json({});
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
