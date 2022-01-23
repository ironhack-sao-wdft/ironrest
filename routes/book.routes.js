const router = require("express").Router();
const BookModel = require("../models/Book.model");
const isAuthenticated = require("../middlewares/isAuthenticated");
const fileUploader = require("../config/cloudinary.config");
// Crud (CREATE) - HTTP POST
// Criar um novo usuário
router.post("/book", isAuthenticated, async (req, res) => {
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
    res.status(500).json(err);
  }

  // cRud (READ) - HTTP GET
  // Buscar dados do usuário
  router.get("/book", async (req, res) => {
    try {
      const books = await BookModel.find();

      res.status(200).json(books);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
});

router.get("/book/:id", async (req, res) => {
  try {
    const book = await BookModel.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ msg: "Book not found." });
    }

    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
    res.status(500).json(err);
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
    res.status(500).json(err);
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

module.exports = router;
