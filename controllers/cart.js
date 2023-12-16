const Cart = require("../models/cart");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      const cartTemp = new Cart({
        products: [],
        user: req.userId,
      });
      await cartTemp.save();
      res.status(200).json({ cart: cartTemp });
      return;
    }
    res.status(200).json({ cart: cart });
    return;
  } catch (err) {
    next(err);
  }
};
