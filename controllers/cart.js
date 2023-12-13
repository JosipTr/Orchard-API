const Cart = require("../models/cart");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    res.status(200).json({ cart: cart });
  } catch (err) {
    next(err);
  }
};
