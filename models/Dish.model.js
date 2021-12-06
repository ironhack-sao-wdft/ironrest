const mongoose = require("mongoose");


const DishSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50, trim: true},
    description: { type: String, required: true, maxlength: 280, trim: true},
    price: { type: Number, required: true, min: 0 },
    type: {type: String, enum: ["Africana", "Alemã", "Árabe", "Argentina", "Asiática", "Açaí", "Baiana", "Bebidas", "Brasileira", "Cafeteria", "Carnes", "Casa de Sucos", "Chinesa", "Colombiana", "Congelados Fit", "Congelados", "Contemporânea", "Coreana", "Cozinha Rápida", "Crepe", "Doces e Bolos", "Espanhola", "Francesa", "Frangos", "Frutos do Mar", "Gaúcha", "Grega", "Hambúrguer", "Indiana", "Italiana", "Japonesa", "Lanches", "Marmita", "Marroquina", "Mediterrânea", "Mexicana", "Mineira", "Nordestina", "Padaria", "Panqueca", "Paranaense", "Pastel", "Peixes", "Peruana", "Pizza", "Portuguesa", "Presentes", "Salgados", "Saudável", "Sopas & Caldos", "Sorvetes", "Tailandesa", "Tapioca", "Típica do Norte", "Variada", "Vegana", "Vegetariana", "Xis", "Yakisoba"]},
    available: { type: Boolean, default: true},
    image: {type: String, trim: true, default: "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"},
    establishment: {type: mongoose.Types.ObjectId, ref: "Establishment"}

})

module.exports = mongoose.model("Dish", ProductSchema);