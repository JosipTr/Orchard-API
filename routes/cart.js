const express = require("express");

const cartController = require("../controllers/cart");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/cart", authMiddleware, cartController.getCart);

module.exports = router;
