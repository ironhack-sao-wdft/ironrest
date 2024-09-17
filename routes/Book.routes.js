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

//Cadastar um  novo livro.

//Só gera cadastro se estiver logado
router.post("/cadastrar-livro", isAuthenticated, attachCurrentUser,  async (req, res) => {
    try {
      //Inserir no banco de dados
      const criateBook  = await BookModel.create({
       ...req.body 
      });

      res.status(201).json(criateBook);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

//Busca lista completa dos livros  (exibe apenas se estiver logado)
router.get("/lista-livro", async (req, res) => {
  try {
    const books  = await BookModel.find();

    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//mostrat o detalhe de um livro específico!!
router.get("/detalhe-livro/:id", async (req, res) => {
  try {
    const book = await BookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: "Livros não encontrado" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

//atualizar um livro específico somente se for dono do livro!!
router.patch("/atualizar-livro/:id", isAuthenticated, attachCurrentUser, async (req, res) => {
   
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
      res.status(500).json(err);
    }
  }
);

//Deleta o livro(Deleta apenas se o livro que foi cadastrado pelo usuário logado)

router.delete("/delete-livro/:id", isAuthenticated, attachCurrentUser, async (req, res) => {
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
router.post("/upload", isAuthenticated, uploader.single("picture"),(req, res) => {
    if (!req.file) {
      return res.status(500).json({ msg: "Upload de arquivo falhou." });
    }

    console.log(req.file);

    return res.status(201).json({ url: req.file.path });
  }
);  

module.exports = router;
