const User = require("../models/user");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const email = user.email;
    return res.status(200).json({ email: email });
  } catch (err) {
    next(err);
  }
};
