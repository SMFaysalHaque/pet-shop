const mongoose = require("mongoose");

const { validateURL } = require("../validate");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 1,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      validate: {
        validator: validateURL,
      },
    },
    category: {
      type: String,
      minLength: 1,
    },
    inventory: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = { Product };
