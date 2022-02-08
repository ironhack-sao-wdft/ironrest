require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("./config/db.config")();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: "https://bookregister.netlify.app" }));

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);

const bookRouter = require("./routes/book.routes");
app.use("/api/book", bookRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
