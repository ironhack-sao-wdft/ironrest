const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
});

const CategoryModel = mongoose.model("Categories", CategorySchema);

module.exports = CategoryModel;
