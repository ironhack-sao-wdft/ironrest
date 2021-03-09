const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {type: String, required: true, maxChar: 80},
    picture: {type: String, required: true},
    category: {type: [String], required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 0.01},
    quantity: {type: Number, required: false, default: 1},
    transactions: {type: mongoose.Schema.Types.ObjectId, ref: "Transaction", required: false}
})

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;