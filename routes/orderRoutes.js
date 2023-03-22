// // const { Router } = require("express");
const express = require("express");
const router = express.Router();
const auth = require("../auth");

const orderController = require("../controllers/orderController");

// ============ GET ALL ORDERS ===========
router.get("/getAllOrders", (req, res) => {
  orderController
    .getAllOrders()
    .then((resultFromController) => res.send(resultFromController));
});

// ======= add order ===========

router.post("/addOrder", (req, res) => {
  const data = {
    email: req.body.email,
    productId: req.body.productId,
    userId: req.body.userId,
    quantity: req.body.quantity,
  };

  orderController.checkout(data).then((result) => res.send(result));
});

// ==== Get User Orders Details ===============
router.get("/getUserDetails", (req, res) => {
  const data = {
    userId: req.body.userId,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };

  orderController.getUserOrders(data).then((result) => res.send(result));
});

module.exports = router;

// // add to cart

// router.post("/addToCart", auth.verify, (req, res) => {
//   let data = {
//     // user ID will be retrieved from the request header
//     userId: auth.decode(req.headers.authorization).id,

//     // Course ID will be retrieve from the request body
//     productId: req.body.productId,
//   };

//   orderController.enroll(data).then((result) => res.send(result));
// });
