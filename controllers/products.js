const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "There are no products!" });
    }
    console.log(products);
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
