const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

exports.validateLogin = () => {
  return [
    body("email", "Invalid e-mail or password!")
      .trim()
      .isEmail()
      .notEmpty()
      .escape(),
    body("password", "Invalid e-mail or password!")
      .isLength({ min: 6 })
      .escape(),
    body("email")
      .custom(async (value, req) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          throw new Error("Invalid e-mail or password");
        }
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) {
          throw new Error("Invalid e-mail or password");
        }
      })
      .escape(),
  ];
};

exports.validateRegister = () => {
  return [
    body("email", "Please enter a valid e-mail!")
      .trim()
      .isEmail()
      .notEmpty()
      .escape(),
    body("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
    body("confirmPassword", "Passwords do not match!")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .escape(),
    body("email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          throw new Error("User already exists!");
        }
      })
      .escape(),
  ];
};
