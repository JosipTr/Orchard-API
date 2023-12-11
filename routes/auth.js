const express = require("express");

const controller = require("../controllers/auth");
const validator = require("../utils/validation/auth-validator");

const router = express.Router();

router.post("/login", validator.validateLogin() ,controller.postLogin);
router.post("/register", validator.validateRegister(),controller.postRegister);

module.exports = router;
