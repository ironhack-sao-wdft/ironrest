const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema({
  date: { type: Date, default: Date.now },
  client: { type: Types.ObjectId, ref: "User" },
  orderStatus: { type: String, enum: ["Aprovado", "Cancelado", "Entregue"] },
  products: [
    new Schema({
      id: { type: Types.ObjectId, ref: "product"},
      qtt: { type: Number },
    })
  ],
  orderValue: { type: Number, min: 0 },
  
});

const OrdersModel = model("Order", OrdersSchema);

module.exports = OrdersModel;
