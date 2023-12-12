const MONGO_DB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster-o.lwkjytd.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const middleware = require("./middleware/index");
const router = require("./routes/index");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(middleware.accessMiddleware);

app.use(router.authRouter);
app.use(router.productsRouter);

app.use(middleware.errorMiddleware);

mongoose
  .connect(MONGO_DB_URI)
  .then((result) => {
    console.log("Connected!");
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
