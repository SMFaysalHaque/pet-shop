const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:productId", productController.getProduct);
router.get("/categories", productController.getCategories);
router.get("/:category", productController.getProductsOfSpecificCategory);

module.exports = router;
