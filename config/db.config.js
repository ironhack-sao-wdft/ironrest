const mongoose = require("mongoose");

async function connect() {
  try {
    // Não esquecer de criar variável de ambiente com endereço do seu servidor Mongo local em desenvolvimento, e o endereço do cluster do Atlas em produção
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao banco de dados", connection.connection.name);
  } catch (err) {
    console.error("Erro de conexão ao banco de dados:", err);
  }
}

module.exports = connect;
