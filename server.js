const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path")

// production middlewarres
require("./start/production")(app);

//All routes app
require("./start/AllRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send([
      { name: "user", url: "http://localhost:5000/api/user" },
      { name: "menu", url: "http://localhost:5000/api/menu" },
    ]);
  });
}

// global uploads file images and files.
app.use("/uploads", express.static("uploads"));

// connection mongodb
require("./config/db")();

// set Port
require("./config/port")(app);
