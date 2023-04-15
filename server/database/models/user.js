const mongoose = require("mongoose");

const { validateEmail, validatePhone } = require("../validate");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 1,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      minLength: 11,
      validate: {
        validator: validatePhone,
      },
    },
    presentAddress: {
      type: String,
      minLength: 1,
    },
    lastLoggedIn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = { User };
