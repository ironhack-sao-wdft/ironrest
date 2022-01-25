const mongoose = require("mongoose");

async function connect() {
  try {
    //const MONGODB_URI = `mongodb://localhost:27017/EXP`
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to DB: ", connection.connection.name);
  } catch (err) {
    console.error("Database connection error: ", err);
  }
}

module.exports = connect;
