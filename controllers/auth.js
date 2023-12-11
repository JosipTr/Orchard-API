const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid email or password!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const user = await User.findOne({ email: email });
    res.status(200).json({ userId: user.id });
  } catch (err) {
    next(err);
  }
};
