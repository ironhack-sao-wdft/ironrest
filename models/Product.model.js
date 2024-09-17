const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: {
    type: String,
    maxlength: 500,
    trim: true,
    default: function () {
      return "O produto '" + this.name + "' ainda não tem descrição.";
    },
  },
  category: {
    type: String,
    enum: ["Sports", "House", "Technology", "Fitness", "Health", "Other"],
    default: "Other",
  },
  price: { type: Number, min: 0, required: true, default: 0 },
  supplier: {
    type: String,
    default: "Fornecedor não identificado.",
  },
  invetory: { type: Number, min: 0, default: 0 },
});

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
