const express = require("express");

//Configurar um roteador
const router = express.Router();

//Importar o modelo da coleção

//Importar o modelo de usuários.
const UserModel = require("../models/User.model");
// importar o modelo de livros.
const BookModel = require("../models/Book.model");

//Importar Autenticação JWT
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const uploader = require("../config/cloudinary.config");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//Cadastar um  novo livro.

//Só gera cadastro se estiver logado
router.post(
  "/create-book",
  isAuthenticated,
  attachCurrentUser,

  async (req, res) => {
    try {
      console.log(req);
      //Inserir no banco de dados
      const createBook = await BookModel.create(req.body);
      res.status(201).json(createBook);
    } catch (err) {
      console.log(req);
      console.log(err);
      res.status(501).json(err);
    }
  }
);

//Busca lista completa dos livros  (exibe apenas se estiver logado)
router.get("/list-book", async (req, res) => {
  try {
    const books = await BookModel.find({});

    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(503).json(err);
  }
});

//mostrat o detalhe de um livro específico!!
router.get("/detail-book/:id", async (req, res) => {
  try {
    const book = await BookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(550).json(error);
  }
});

//atualizar um livro específico somente se for dono do livro!!
router.patch(
  "/update-book/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      // Extrair os dados do corpo da requisição
      const book = await BookModel.findOne({ _id: req.params.id });
      // Atualizar o registro
      if (!book) {
        return res.status(404).json({ msg: "Livro não encontrado." });
      }

      const BookUpdate = await BookModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      res.status(200).json(BookUpdate);
    } catch (err) {
      console.log(err);
      res.status(504).json(err);
    }
  }
);

//Deleta o livro(Deleta apenas se o livro que foi cadastrado pelo usuário logado)

router.delete(
  "/delete-book/:id",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      const book = await BookModel.findOne({ _id: req.params.id });

      const deleteBook = await BookModel.deleteOne({ _id: req.params.id });

      if (deleteBook.deletedCount < 1) {
        return res.status(404).json({ message: "Livro não encontrado" });
      }

      res.status(200).json({ message: "Livro deletado." });
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Livro não encontrado" });
    }
  }
);

//rota de upload de imagens pelo cloudinary
// Upload
router.post(
  "/upload",
  isAuthenticated,
  uploader.single("picture"),
  (req, res) => {
    if (!req.file) {
      return res.status(502).json({ msg: "Upload de arquivo falhou." });
    }

    console.log(req.file);

    return res.status(201).json({ url: req.file.path });
  }
);

module.exports = router;

/*const router = require("express").Router();
const BookModel = require("../models/Book.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const fileUploader = require("../config/cloudinary.config");
// Criar um novo usuário
const UserModel = require("../models/User.model");

// Crud (CREATE) - HTTP POST
router.post(
  "/create-book",
  isAuthenticated,
  attachCurrentUser,
  async (req, res) => {
    try {
      console.log(req.body);
      const { title, author, synopsis, releaseYear, genre, coverImage } =
        req.body;

      const bookCreated = await BookModel.create({
        title,
        author,
        synopsis,
        releaseYear,
        genre,
        coverImage,
      });

      res.status(201).json(bookCreated);
    } catch (err) {
      console.log(err);
      res.status(501).json(err);
    }

    // cRud (READ) - HTTP GET
    // Buscar dados do usuário
    router.get("/create", async (req, res) => {
      try {
        const books = await BookModel.find();

        res.status(200).json(books);
      } catch (err) {
        console.log(err);
        res.status(502).json(err);
      }
    });
  }
);

router.get("/book/:id", async (req, res) => {
  try {
    const book = await BookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ msg: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(503).json(err);
  }
});

router.patch("/book/:id", isAuthenticated, async (req, res) => {
  try {
    const book = await BookModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ msg: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(504).json(err);
  }
});
router.delete("/book/:id", isAuthenticated, async (req, res) => {
  try {
    const book = await BookModel.deleteOne({ _id: req.params.id });

    if (book.deletedCount < 1) {
      return res.status(404).json({ msg: "Not found." });
    }

    res.status(200).json({});
  } catch (err) {
    console.log(err);
    res.status(505).json(err);
  }
});

router.post("/upload", fileUploader.single("image"), (req, res) => {
  console.log(req.body);

  BookModel.create({ coverImage: req.file.url })
    .then((data) => {
      console.log(data);
      res.redirect("/upload");
    })
    .catch((error) => console.log(`Not found.`));
});

module.exports = router;*/
