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

exports.postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;

  console.log(name, imageUrl)

  try {
    const product = new Product({
      name: name,
      imageUrl: imageUrl,
    });
    await product.save();
    res.status(201).json({ message: "Product added!" });
    return;
  } catch (err) {
    next(err);
  }
};
