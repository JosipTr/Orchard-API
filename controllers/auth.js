const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const user = await User.findOne({ email: req.body.email });
    return res.status(200).json({ userId: user.id });
  } catch (err) {
    next(err);
  }
};

exports.postRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email: email, password: hashedPassword });
    await user.save();
    return res.status(200).json({ userId: user.id });
  } catch (err) {
    next(err);
  }
};
