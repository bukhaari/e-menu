const mongoose = require("mongoose");

function db_connection() {
  let url = ""
  if (process.env.NODE_ENV === "production"){
    url = process.env.ConnUrlPro;
  }else{
    url = url = process.env.ConnUrlDev;
  }
    mongoose
      .connect(url)
      .then(() => console.log("connected to Mongodb"))
      .catch(() => console.log("failed to connect Mongodb"));
}

module.exports = db_connection;
