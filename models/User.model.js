const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  fotoUrl: { type: String, trim: true },
  telefone: { type: String, trim: true },
  instagramUrl: { type: String, trim: true },
  rua: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  numero: { type: String },
  estado: { type: String },
  rank: { type: Number, trim: true, max: 5, min: 0 },
  documento: { type: Number, trim: true },
  dataDeNascimento: { type: Date, trim: true },
  disponivel: { type: String, enum: ["Sim", "Não", "Outro"] },
  formaDePagamento: { type: String, enum: ["Cartão", "Dinheiro", "PIX"] },
  reservaId: [{ type: Schema.Types.ObjectId, ref: "Reserva" }], 
});

const UserModel = model("User", UserSchema);

module.exports = UserModel;