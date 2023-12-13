const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    return res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};
