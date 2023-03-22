const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  products: [
    {
      productId: {
        type: String,
      },

      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 1,
  },
  purchasedOn: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
