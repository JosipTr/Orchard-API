const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    const token = singUpToken(user._id);
    // const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    //   expiresIn: "1h",
    // });
    return res.status(200).json({ token: token, userId: user.id });
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
    const token = singUpToken(user._id);
    // const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
    //   expiresIn: "1h",
    // });
    return res.status(200).json({ token: token, userId: user.id });
  } catch (err) {
    next(err);
  }
};

singUpToken = (userId) => {
  const token = jwt.sign({ userId: userId }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};
