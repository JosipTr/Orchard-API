const express = require("express");

const controller = require("../controllers/products");
const middleware = require("../middleware/index");

const router = express.Router();

router.get("/products", middleware.authMiddleware ,controller.getProducts);

module.exports = router;
