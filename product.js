const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Product name is required!"],
  },
  productDescription: {
    type: String,
    required: [true, "Product Description is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required!"],
  },
  productImage: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  productQuantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
