const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const departament_controller = require("./departament_controller");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/http_app", {
  useNewUrlParser: true,
});

app.use("/departments", departament_controller);
// app.use("/products", products_controller);

app.listen(3000);
