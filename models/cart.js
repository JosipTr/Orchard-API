const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  products: [
    {
      product: Schema.Types.ObjectId,
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = new mongoose.model("Cart", cartSchema);
