const express = require("express");
const router = express.Router();
const auth = require("../auth");

const userController = require("../controllers/userController");
const orderController = require("../controllers/orderController");
const productController = require("../controllers/productController"); ////

// Check Email
router.post("/checkEmail", (req, res) => {
  userController.checkEmailExists(req.body).then((result) => res.send(result));
});

// user update isActive Status
router.put("/userToNotAdmin/:userId", auth.verify, (req, res) => {
  userController
    .setUserToNotAdmin(req.params)
    .then((result) => res.send(result));
});

router.put("/userToAdmin/:userId", auth.verify, (req, res) => {
  userController.setUserToAdmin(req.params).then((result) => res.send(result));
});

//===== USER REGISTRATION ROUTE =============

router.post("/register", (req, res) => {
  userController.registerUser(req.body).then((result) => res.send(result));
});

// ===== GET SINGLE USER ===========
router.get("/details", auth.verify, (req, res) => {
  // Provides the user's ID for the getProfile controller method

  const userData = {
    id: auth.decode(req.headers.authorization).id,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  console.log(userData);
  console.log(req.headers.authorization);

  userController
    .getProfile({ id: userData.id })
    .then((profile) => {
      // Add isAdmin property to the profile object
      profile.isAdmin = userData.isAdmin;
      res.send(profile);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving profile information" });
    });
});

// get user details
router.get("/details/:email", (req, res) => {
  const userData = {
    email: req.params.email,
  };
  console.log(userData);
  console.log(req.headers.authorization);

  userController
    .userDetails({ email: userData.email })
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "Error retrieving profile information" });
    });
});

//===== USER AUTHENTICATION ========

router.post("/login", (req, res) => {
  userController.loginUser(req.body).then((result) => res.send(result));
});

// ======= GET ALL USERS ======

router.get("/", (req, res) => {
  userController.getAllUsers().then((result) => res.send(result));
});
// ===== GET USER ORDERS ========

router.get("/getUserOrders/:userId", auth.verify, (req, res) => {
  const data = {
    userId: req.body,
    isAdmin: auth.decode(req.headers.authorization).isAdmin,
  };
  userController.getUserOrders(data).then((result) => res.send(result));
});

// delete user
router.delete("/deleteUser/:userId", auth.verify, (req, res) => {
  userController.deleteUser(req.params).then((result) => res.send(result));
});

// update user details
router.put("/updateUser/:userId", auth.verify, (req, res) => {
  // const adminKey = { isAdmin: auth.decode(req.headers.authorization).isAdmin };

  userController
    .updateUser(req.params, req.body)
    .then((result) => res.send(result));
});

// //===ADD TO CART (ENROLL)====
// router.post("/addToCart", auth.verify, (req, res) => {
//   let data = {
//     // user ID will be retrieved from the request header
//     userId: auth.decode(req.headers.authorization).id,

//     // Course ID will be retrieve from the request body
//     productId: req.body.productId,
//   };

//   userController.addToCart(data).then((result) => res.send(result));
// });

// // ====== CHECKOUT =============
// router.post("/checkOut", (req, res) => {
//   orderController.checkout(req.body).then((result) => res.send(result));
// });

// router.post("/addToCart", auth.verify, (req, res) => {
//   let data = {
//     userId: req.body,
//     productId: req.body,
//   };

//   productController.addToCart(data).then((result) => res.send(result));
// });
module.exports = router;
