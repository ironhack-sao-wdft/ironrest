// Importar o express
const express = require("express");

//Configurar um roteador
const router = express.Router();

// importar o modelo do book
const BookModel = require("../models/Book.model");

//Importar instância do multer que faz os uploads
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");

// cRud Read (GET) (Cadastro)
router.post(
  "/cadastro",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      //Inserir no banco
      const criateBook = await BookModel.create(req.body);

      // Responder a requisição
      // Pela regra do REST, a resposta de uma inserção deve conter o registro recém-inserido com status 201 (Created)

      res.status(201).json(criateBook);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// cRud Read (GET) (Lista)

router.get("/lista", async (req, res) => {
  try {
    // Buscar as informações no banco
    const books = await BookModel.find();

    // Responder a requisição
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// cRud Read (GET) (Detalhe)

router.get("/detalhes/:id", async (req, res) => {
  try {
    // Buscar as informações no banco
    const book = await BookModel.findOne({ _id: req.params.id });

    // Verificar se o banco encontrou o produto
    if (!book) {
      return res.status(404).json({ msg: "Livro não encontrado :(" });
    }

    // Responder a requisição
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// PUT => substituição (destrutiva)
// PATCH => atualização (não-destrutiva)

// crUd Update (PATCH) atualizar livros

router.patch(
  "/update/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      // Atualizar o registro
      const bookUpdate = await BookModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!book) {
        return res.status(404).json({ msg: "Livro não encontrado :(" });
      }

      // Responder a requisição
      res.status(200).json(bookUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// cruD Delete (DELETE)

router.delete(
  "/delete/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const deleteBook = await BookModel.deleteOne({ _id: req.params.id });

      if (deleteBook.deletedCount < 1) {
        return res.status(404).json({ msg: "Livro não encontrado :(" });
      }

      // Pela regra do REST, deleções devem retornar um objeto vazio
      res.status(200).json({});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

// Upload de arquivos no Cloudinary
router.post(
  "/upload",
  isAuthenticated,
  uploader.single("picture"),
  (req, res) => {
    if (!req.file) {
      return res.status(500).json({ msg: "Upload de arquivo falhou :(" });
    }

    console.log(req.file);

    return res.status(201).json({ url: req.file.path });
  }
);

module.exports = router;