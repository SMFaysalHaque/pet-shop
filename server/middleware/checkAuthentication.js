const path = require("path");
const viewPath = path.join(__dirname, "./config/.env.dev").replace(/\\/g, "/");
require("dotenv").config({ path: viewPath });

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed.",
    });
  }
};
