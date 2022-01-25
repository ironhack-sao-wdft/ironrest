const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
  },
  coverImage: {
    type: String,
    default:
      "https://img.elo7.com.br/product/zoom/308AD56/quadro-dark-capa-do-livro-da-serie-23x31cm-varias-cores-poster.jpg",
  },
  userId: {type: String}
});

const BookModel = model("Book", BookSchema);

module.exports = BookModel;
