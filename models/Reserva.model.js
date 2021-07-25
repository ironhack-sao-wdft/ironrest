const { Schema, model } = require("mongoose");

const ReservaSchema = new Schema({
  horario: { type: String, required: true, trim: true },
  numeroDaMesa: { type: String, trim: true },
  quantidadeDePessoas: { type: Number, required: true, trim: true },
  aprovacao: { type: String, trim: true },
  agendaId: { type: Schema.Types.ObjectId, ref: "Agenda" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  estabId: { type: Schema.Types.ObjectId, ref: "Estabelecimento" },
});
const ReservaModel = model("Reserva", ReservaSchema);
module.exports = ReservaModel;