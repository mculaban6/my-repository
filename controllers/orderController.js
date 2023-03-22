const Product = require("../models/product");
const Order = require("../models/order");
const User = require("../models/user");

//======= CHECKOUT ============
module.exports.checkout = (reqBody) => {
  if (reqBody.isAdmin) {
    let message = Promise.resolve("admin cannot place an order");
    return message.then((value) => {
      return value;
    });
  } else {
    return Product.findById(reqBody.productId).then((product) => {
      let newOrder = new Order({
        userId: reqBody.userId,
        products: [
          {
            productId: reqBody.productId,
            quantity: reqBody.quantity,
            price: reqBody.price,
          },
        ],
        totalAmount: product.price * reqBody.quantity,
      });
      return newOrder.save().then((result) => {
        return Promise.resolve({
          message: "order successfully created",
          result: result,
        });
      });
    });
  }
};

//======= GET ALL ORDERS =========
module.exports.getAllOrders = (data) => {
  return Order.find({}).then((result) => {
    return result;
  });
};

//====== GET USER ORDERS ==========
module.exports.getUserOrders = (reqBody) => {
  return Order.aggregate([
    { $match: { userId: reqBody.userId } },
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$userId",
        orders: {
          $push: {
            productId: "$products.productId",
            quantity: "$products.quantity",
            amount: "$products.amount",
          },
        },
        totalQuantity: { $sum: "$products.quantity" },
        totalAmount: { $sum: "$totalAmount" },
      },
    },
    {
      $project: {
        userId: "$_id",
        orders: 1,
        totalQuantity: 1,
        totalAmount: 1,
        _id: 0,
      },
    },
  ]).then((orders) => {
    return orders;
  });
};

// add to cart
// module.exports.addToCart = async (req, res) => {
//   const { userId, productId, quantity } = req.body;

//   try {
//     // Find existing cart for user
//     let order = await Order.findOne({ userId });

//     if (!order) {
//       // Create new cart for user if none exists
//       order = new Order({ userId });
//     }

//     // Check if product already exists in cart
//     const existingProductIndex = order.products.findIndex(
//       (product) => product.productId === productId
//     );

//     if (existingProductIndex !== -1) {
//       // If product already exists, update the quantity
//       order.products[existingProductIndex].quantity += quantity;
//     } else {
//       // If product does not exist, add it to the cart
//       order.products.push({ productId, quantity });
//     }

//     // Recalculate the total amount
//     order.totalAmount = order.products.reduce(
//       (acc, product) => acc + product.quantity,
//       0
//     );

//     // Save the cart and send a response
//     await order.save();
//     res.status(200).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
