const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const bodyparser = require("body-parser");

const fileUpload = require("express-fileUpload");
const dotenv = require("dotenv");

const errorMiddleeare = require("./middlewares/errors");

// setting up config file (server ke port set)
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", payment);
app.use("/api/v1/", order);

// middleware handle errors
app.use(errorMiddleeare);

module.exports = app;
