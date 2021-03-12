require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db.config")();

const app = express();

app.use(express.json());
// Não esquecer de criar variável de ambiente com o endereço do seu app React (local ou deployado no Netlify)
// app.use(cors({ origin: process.env.REACT_APP_URL }));
app.use(cors());
require("./config/passport.config")(app);

app.use(cors({ origin: process.env.CLIENT_URL }));

const userRouter = require("./routes/user.routes");
app.use("/", userRouter);

const transactionRouter = require("./routes/transactions.routes");
app.use("/", transactionRouter);

const productRouter = require("./routes/product.routes");
app.use("/", productRouter);

const categoryRouter = require("./routes/category.routes");
app.use("/", categoryRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
