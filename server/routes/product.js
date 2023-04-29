const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthentication = require("../middleware/checkAuthentication");

router.get("/", productController.getProducts);
router.get("/categories", productController.getCategories);
router.get("/categories/:category", productController.getProductsOfSpecificCategory);
router.get("/:productId", productController.getProduct);

router.post("/", checkAuthentication, checkAdmin, productController.createProduct);
router.post("/:productId", checkAuthentication, checkAdmin, productController.handleUpdateProduct);
router.delete("/:productId", checkAuthentication, checkAdmin, productController.handleDeleteProduct);

module.exports = router;
