const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },

  firstName: {
    type: String,
    required: [true, "First Name is required!"],
  },

  lastName: {
    type: String,
    required: [true, "Last Name required"],
  },

  password: {
    type: String,
    required: [true, "password is required!"],
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile number is required"],
  },
  permanentAddress: {
    type: String,
  },
  shippingAddress: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
