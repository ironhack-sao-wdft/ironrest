const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, maxlength: 500 },
  category: {
    type: String,
    enum: ["Sports", "House", "Technology", "Fitness", "Health", "Other"],
    default: "Other",
  },
  price: { type: Number, min: 0, required: true },
  supplier: { type: String },
  quantityInvetory: { type: Number, min: 0 },
});

const ProductModel = model("Product", ProductSchema);

module.exports = ProductModel;
