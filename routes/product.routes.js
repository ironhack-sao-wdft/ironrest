const express = require("express");
const router = express.Router();

const passport = require("passport");

const uploader = require("../config/cloudinary.config");

const Product = require("../models/Product");

// Rota para upload de imagens
router.post("/upload", uploader.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(500).json({ msg: "No file uploaded" });
  }

  console.log(req.file);

  return res.status(200).json({ fileUrl: req.file.path });
});

//   Crud (Create)
router.post("/product", async (req, res) => {
  // Criar o documento no banco usando nosso Model
  try {
    // Usa o model pré-definido para criar um novo documento no banco

    // OBS.: O objeto req.user é criado automaticamente pelo passport no sucesso do login. Ele só está disponível para rotas autenticadas pelo passport.authenticate()
    const newProduct = await Product.create({ ...req.body });
    // O banco responde com o documento recém-criado
    console.log(newProduct);

    // Respondemos a requisição com o documento recém-criado e status 201 (Created)
    return res.status(201).json(newProduct);
  } catch (err) {
    // Caso algo dê errado, respondemos com o status 500 (Internal Server Error) e o motivo do erro
    return res.status(500).json({ msg: err });
  }
});

// cRud (Read): Rota para listar todos os pets do usuário logado
router.get("/product/number/:limit", async (req, res) => {
  try {
    // O find() sem filtros traz todos os documentos da collection
    console.log("hey it's get");
    const products = await Product.find().limit(Number(req.params.limit));

    // .limit(Number(req.params.limit))

    // O status 200 é um status genérico de sucesso (OK)
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// cRud (Read): Rota para trazer um pet específico
router.get("/product/:id", async (req, res) => {
  try {
    // O findOne() traz a primeira ocorrência do resultado da consulta
    const product = await Product.findOne({ _id: req.params.id });
    console.log(product);

    // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // O status 200 é um status genérico de sucesso (OK)
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

// crUd (Update): Rota para substituir um pet específico pelo enviado no corpo da requisição
router.patch("/product/:id", async (req, res) => {
  try {
    // O findOneAndUpdate() vai buscar um documento que atenda à consulta do primeiro parâmetro, e, caso encontre, atualizar com o conteúdo do segundo parâmetro. Ao final da atualização, retornará o objeto atualizado
    const updatedProduct = await Product.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    // Se o findOne() retornar null, ou seja, não encontrar o pet no banco, retornamos um 404 dizendo que não encontramos o pet
    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD (Delete): Apaga o pet especificado do banco

router.delete("/product/:id", async (req, res) => {
  try {
    const deleted = await Product.deleteOne({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
