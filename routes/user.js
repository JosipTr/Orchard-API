const express = require("express");

const userController = require("../controllers/user");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/user", authMiddleware, userController.getUser);

module.exports = router;
