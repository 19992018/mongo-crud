const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Const ProductSchema = mongoose.Schema({... defines schema ...})

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      reqiured: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };

//import Product  in index.js
