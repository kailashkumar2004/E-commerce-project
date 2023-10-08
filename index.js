const mongoose = require("mongoose");
const express = require("express");
const database = require("./src/app/db/db");
// const { User } = require("./src/app/module/user/user.model/user.modle");
// const{product}=require("./src/app/module/product/product.model/product.model")
const Data = database.database;
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./router");
const date = new Date();
console.log("date=======================", date)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes.map(route => {
    app.use(route.path, route.handler);
  });
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
