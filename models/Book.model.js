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
      "https://images-na.ssl-images-amazon.com/images/I/51HoWoBwwBL._SX346_BO1,204,203,200_.jpg",
  },
  userId: {type: String}
});

const BookModel = model("Book", BookSchema);

module.exports = BookModel;
