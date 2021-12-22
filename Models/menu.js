const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    bestSeller: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);


const Model = mongoose.model("menus", schema);

module.exports = {Model, schema};
