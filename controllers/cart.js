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

exports.postAddToCart = async (req, res, next) => {
  const data = req.body;
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (cart.products.length === 0) {
      cart.products.push({ product: data.id, quantity: data.quantity });
      await Cart.updateOne({ user: req.userId }, { products: cart.products });
      res.status(201).json({ message: "Product added", cart: cart });
      return;
    }

    for (let i = 0; i < cart.products.length; i++) {
      let productId = (cart.products[i].product).toString();
      if (productId === data.id) {
        cart.products[i].quantity++;
        await Cart.updateOne(
          { user: req.userId },
          { products: cart.products }
        );
        res.status(201).json({ message: "Product quantitiy updated!", cart: cart });
        return;
      }
    }

    cart.products.push({ product: data.id, quantity: data.quantity });
    await Cart.updateOne({ user: req.userId }, { products: cart.products });
    res.status(201).json({ message: "Product added", cart: cart });
    return;
  } catch (err) {
    next(err);
  }
};
