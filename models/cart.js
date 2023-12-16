const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  _id: false,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema({
  products: [cartItemSchema],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Cart", cartSchema);
