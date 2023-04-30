const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const checkAdmin = require("../middleware/checkAdmin");
const checkAuthentication = require("../middleware/checkAuthentication");

router.get("/", productController.getProducts);
router.get("/categories", productController.getCategories);
router.get("/categories/:category", productController.getProductsOfSpecificCategory);

router.post("/categories", checkAuthentication, checkAdmin, productController.createCategory);
router.delete("/categories/:category", checkAuthentication, checkAdmin, productController.handleDeleteCategory);

router.get("/:productId", productController.getProduct);

router.post("/", checkAuthentication, checkAdmin, productController.createProduct);
router.post("/:productId", checkAuthentication, checkAdmin, productController.handleUpdateProduct);
router.delete("/:productId", checkAuthentication, checkAdmin, productController.handleDeleteProduct);

module.exports = router;
