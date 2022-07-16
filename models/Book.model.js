const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  synopsis: { type: String },
  year: {type: Number},
  genre: { type: String },
  pictures: {
      type: String, default: 'https://www.shortandtweet.com/images/short-and-tweet-default-book-cover.jpg', trim: true,
  },
  userId: {type:String}
});


module.exports = model("Book", BookSchema)


