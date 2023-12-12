const express = require("express");

const controller = require("../controllers/products");
const middleware = require("../middleware/index");

const router = express.Router();

router.get("/products", controller.getProducts);

router.post(
  "/add-product",
  middleware.authMiddleware,
  controller.postAddProduct
);

module.exports = router;
