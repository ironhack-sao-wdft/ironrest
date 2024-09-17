require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
app.use(cors({ origin: process.env.REACT_APP_URL }));

// Rota genérica de captura de erros: padrão interno do servidor
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
  return next();
});

const userRouter = require("./routes/user.routes");
app.use("/api", userRouter);
// Criando a rota pra pedidos
const orderRouter = require("./routes/order.routes")
app.use("/api/order", orderRouter)

// import do router de products
const productRouter = require("./routes/product.routes");
app.use("/api", productRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
