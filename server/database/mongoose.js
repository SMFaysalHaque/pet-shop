const path = require("path");
const viewPath = path.join(__dirname, "./config/.env.dev").replace(/\\/g, "/");
require("dotenv").config({ path: viewPath });
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_ADMIN_NAME +
      ":" +
      process.env.MONGO_ATLAS_PW +
      "@cluster1.rg5vnjj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("You are connected to the database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = { mongoose };
