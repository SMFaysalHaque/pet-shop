const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthentication = require("../middleware/checkAuthentication");

router.get("/", checkAuthentication, checkAdmin, orderController.getOrders);
router.post("/register", checkAuthentication, orderController.registerOrder);

module.exports = router;
