const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1,
  },
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = { Category };
