const category = require("../Router/category");
const User = require("../Router/user");
const Login = require("../Router/login");
const menu = require("../Router/menu");
const company = require("../Router/company");
const express = require("express");
const bodyParser = require("body-parser");

function allRoutes(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());

  app.use("/api/menu", menu);
  app.use("/api/user", User);
  app.use("/api/login", Login);
  app.use("/api/company", company);
  app.use("/api/category", category);

  //main route
  app.get("/", (req, res) => {
    res.send("Welcome to Project");
  });
}

module.exports = allRoutes;
