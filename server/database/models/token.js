const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      default: Date.now,
      expires: 3600,
    },
  },
  { timestamps: true }
);

const Token = new model("Token", tokenSchema);

export default { Token };
