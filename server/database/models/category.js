const mongoose = require("mongoose");

const { validateURL } = require("../validate");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: validateURL,
    },
  },
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = { Category };
