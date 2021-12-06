// Importar o mongoose
const mongoose = require("mongoose");

// Definifir quais campos e quais regras desses campos os documentos no MongoDB terão (Schema)
const StoreItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxLength: 50},
  description: { type: String, required: true, trim: true, maxLength:280},
  price: { type: Number, required: true, trim: true, min: 0},
  tag: { type: String, required: true, enum: ["Bebidas", "Remedios", "Mercearia", "Frios E Laticinios", "Carnes, Aves e Peixes", "Embalagens E Descartáveis"]},
  available: { type: Boolean, required: true, enum: [true, false]},
  picture: { type: String, trim: true, default:"https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"},
  establishment: [{ type: mongoose.Types.ObjectId, ref: "Establishment" }]
});

// Exportar o modelo da coleção
module.exports = mongoose.model("StoreItem", StoreItemSchema);
