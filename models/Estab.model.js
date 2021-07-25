const { Schema, model } = require("mongoose");

const EstabSchema = new Schema({
  nameEstab: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: { type: String, required: true },
  fotoUrl: [{ type: String, trim: true }],
  telefone: { type: String, trim: true },
  redeSocialUrl: { type: String, trim: true },
  rua: { type: String, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  numero: { type: String, required: true },
  estado: { type: String, required: true },
  localizacaoUrl: { type: String, required: true },
  rank: { type: Number, trim: true, max: 5, min: 0 },
  cnpj: { type: Number, trim: true, required: true },
  horarioDeFuncionamento: { type: String, required: true },
  reservaId: [{ type: Schema.Types.ObjectId, ref: "Reserva" }],    
});

const EstabModel = model("Estabelecimento", EstabSchema);

module.exports = EstabModel;