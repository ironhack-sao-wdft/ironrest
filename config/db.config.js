const mongoose = require("mongoose");

async function connect() {
  try {
    // Não esquecer de criar variável de ambiente com endereço do seu servidor Mongo local em desenvolvimento, e o endereço do cluster do Atlas em produção
<<<<<<< HEAD
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB: ", connection.connection.name);
=======
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado ao banco de dados", connection.connection.name);
>>>>>>> be0acca55837dbfc58d9e8ad405ec77cd4daa778
  } catch (err) {
    console.error("Erro de conexão ao banco de dados:", err);
  }
}

module.exports = connect;
