const router = require("express").Router();
// const bcrypt = require("bcryptjs");

const ProductModel = require("../models/Product.model");
// const isAuthenticated = require("../middlewares/isAuthenticated");
// const attachCurrentUser = require("../middlewares/attachCurrentUser");

// Crud (CREATE) - HTTP POST: Criar um novo produto
router.post("/product", (req, res, next) => {});
// Crud (READ) - HTTP GET: Ler a lista de produtos

// Crud (READ) - HTTP GET: Ler um produto único pelo ID

// Crud (UPDATE) - HTTP PATCH: Update de um produto único pelo ID (altera alguns campos)

// Crud (UPDATE) - HTTP PUT: Update de um produto único pelo ID (substitui tudo)

// Crud (DELETE) - HTTP DELETE: Delete de um produto único pelo ID

module.exports = router;
