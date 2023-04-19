const path = require("path");
const viewPath = path.join(__dirname, "./config/.env.dev").replace(/\\/g, "/");
require("dotenv").config({ path: viewPath });

//connect to database
let { mongoose } = require("./database/mongoose");

const express = require("express");
const cors = require("cors");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");

const app = express();

app.use(express.json());
app.use(cors());

//API ROUTES
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
