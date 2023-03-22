const Product = require("../models/product");

//===== CREATING PRODUCTS (ADMIN) ========
// module.exports.createProduct = (data) => {
//   if (data.isAdmin) {
//     return Product.findOne({ productName: data.product.productName }).then(
//       (product) => {
//         if (product) {
//           let message = Promise.resolve("Product already added!");
//           return message.then((value) => {
//             return value;
//           });
//         } else {
//           let new_product = new Product({
//             productName: data.product.productName,
//             productDescription: data.product.productDescription,
//             price: data.product.price,
//             productImage: data.product.productImage,
//             createdOn: data.product.createdOn,
//           });
//           return new_product.save().then((new_product, error) => {
//             if (error) {
//               return error;
//             }
//             let message = Promise.resolve("New Product Successfully Added.");
//             return message.then((value) => {
//               return value;
//             });
//           });
//         }
//       }
//     );
//   } else {
//     let message = Promise.resolve("User must be Admin to Access this.");
//     return message.then((value) => {
//       return value;
//     });
//   }
// };
// module.exports.createProduct = (data) => {
//   if (!data.isAdmin) {
//     return Promise.resolve("User must be Admin to Access this.");
//   }

//   if (!data.product.productName) {
//     return Promise.resolve("Product name is required.");
//   }

//   if (!data.product.productDescription) {
//     return Promise.resolve("Product description is required.");
//   }

//   if (!data.product.price || isNaN(data.product.price)) {
//     return Promise.resolve("Price is required and must be a number.");
//   }

//   if (!data.product.productImage) {
//     return Promise.resolve("Product image is required.");
//   }

//   return Product.findOne({ productName: data.product.productName }).then(
//     (product) => {
//       if (product) {
//         return Promise.resolve("Product already added!");
//       } else {
//         const new_product = new Product({
//           productName: data.product.productName,
//           productDescription: data.product.productDescription,
//           price: data.product.price,
//           productImage: data.product.productImage,
//           createdOn: data.product.createdOn,
//         });
//         return new_product.save().then(() => {
//           return Promise.resolve("New Product Successfully Added.");
//         });
//       }
//     }
//   );
// };

module.exports.createProduct = (reqBody) => {
  let newProduct = new Product({
    productName: reqBody.productName,
    productDescription: reqBody.productDescription,
    price: reqBody.price,
    productImage1: reqBody.productImage1,
    productImage2: reqBody.productImage2,
    productImage3: reqBody.productImage3,
    productStock: reqBody.productStock,
    createdOn: Date(),
  });

  return newProduct.save().then((product, error) => {
    if (error) {
      return false;
    } else {
      return product;
    }
  });
};
// ==== SETTING PRODUCTS AS ACTIVE/INACTIVE (archiving and unarchiving using req.body)==========

// module.exports.updateProduct = (reqParams, reqBody) => {
//   // speicify the fields/properties of the document to be updated

//   let updatedProduct = {
//     name: reqBody.name,
//     description: reqBody.description,
//     price: reqBody.price,
//   };
//   return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then(
//     (product, error) => {
//       if (error) {
//         return false;
//       } else {
//         return {
//           message: "Product updated successfully",
//         };
//       }
//     }
//   );
// };
// ==== RETRIEVING ALL PRODUCTS (ACTIVE AND INACTIVE)"ADMIN"======
// module.exports.getAllProducts = (data) => {
//   if (data.isAdmin) {
//     return Product.find({}).then((result) => {
//       return result;
//     });
//   }
//   let message = Promise.resolve("User must be Admin to Access this.");

//   return message.then((value) => {
//     return value;
//   });
// };

module.exports.getAllProducts = (data) => {
  // if(data.isAdmin){
  return Product.find({}).then((result) => {
    return result;
  });

  // };
};
//====get single product===

module.exports.getProduct = (data) => {
  return Product.findById(data.productId).then((result) => {
    return result;
  });
};

//==== RETRIEVING ALL PRODUCTS (ACTIVE ONLY) "USER" =====

module.exports.getAllActiveProducts = (data) => {
  // if (data.isAdmin) {
  //   let message = Promise.resolve("Cannot Access, User only!");
  //   return message.then((value) => {
  //     return value;
  //   });
  // }
  return Product.find({ isActive: true }).then((result) => {
    return result;
  });
};

//==== RETRIEVING SINGLE PRODUCT (ADMIN - active and inactive)==========

module.exports.productDetails = (data) => {
  if (data.isAdmin) {
    return Product.findById(data.id).then((product) => {
      return product;
    });
  }
  let message = Promise.resolve("User must be Admin to use this feature.");
  return message.then((value) => {
    return value;
  });
};

//==== RETRIEVING SINGLE PRODUCT (USER- ACTIVE)==========

module.exports.userProductDetails = (data, reqBody) => {
  if (data.isAdmin) {
    let message = Promise.resolve("Feature not available for Admin");
    return message.then((value) => {
      return value;
    });
  } else {
    return Product.findById(data.id).then((product) => {
      if (!product.isActive) {
        let message = Promise.resolve("Product not Available!");
        return message.then((value) => {
          return value;
        });
      }
      return product;
    });
  }
};

// ========= UPDATE PRODUCT (ADMIN) ==============

// module.exports.updateProduct = (reqParams, reqBody, data) => {
//   if (data.isAdmin) {
//     let updatedProduct = {
//       productName: reqBody.productName,
//       productDescription: reqBody.productDescription,
//       price: reqBody.price,
//     };
//     return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then(
//       (product, error) => {
//         if (error) {
//           return false;
//         } else {
//           return {
//             message: "Product updated successfully",
//             product,
//           };
//         }
//       }
//     );
//   } else {
//     let message = Promise.resolve("User must be Admin to use this feature.");
//     return message.then((value) => {
//       return value;
//     });
//   }
// };
module.exports.updateProduct = (reqParams, reqBody) => {
  let updatedProduct = {
    productName: reqBody.productName,
    productDescription: reqBody.productDescription,
    price: reqBody.price,
    productImage: reqBody.productImage,
    productStock: reqBody.productStock,
  };
  return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "Product updated successfully",
        };
      }
    }
  );
};

//update cart stock

module.exports.updateStock = (reqParams, reqBody) => {
  let updatedProduct = {
    productStock: reqBody.productStock,
  };
  return Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "Product updated successfully",
        };
      }
    }
  );
};
// ======= ARCHIVING PRODUCTS ============
// module.exports.archiveProduct = (reqParams, data) => {
//   if (data.isAdmin) {
//     let updateActiveField = {
//       isActive: false,
//     };
//     return Product.findByIdAndUpdate(
//       reqParams.productId,
//       updateActiveField
//     ).then((product, error) => {
//       if (!product.isActive) {
//         let message = Promise.resolve("Product already archived!");
//         return message.then((value) => {
//           return value;
//         });
//       } else {
//         return {
//           message: "Archiving Product successfully",
//         };
//       }
//     });
//   } else {
//     let message = Promise.resolve("User must be Admin to use this feature.");
//     return message.then((value) => {
//       return value;
//     });
//   }
// };
module.exports.archiveProduct = (reqParams) => {
  let updateActiveField = {
    isActive: false, // sa schema nka default = true, para inactive isActive = false
  };

  return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "archiving Product successfully",
        };
      }
    }
  );
};

module.exports.unarchiveProduct = (reqParams) => {
  let updateActiveField = {
    isActive: true, // sa schema nka default = true, para inactive isActive = false
  };

  return Product.findByIdAndUpdate(reqParams.productId, updateActiveField).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "unarchiving Product successfully",
        };
      }
    }
  );
};

module.exports.deleteProduct = (reqParams) => {
  return Product.findByIdAndRemove(reqParams.productId).then((result, err) => {
    return { message: "item deleted" };
  });
};

//////////////////////////////////////////////////////

// module.exports.addToCart = async (data) => {
//   const { userId, productId } = data;

//   try {
//     let user = await User.findById(userId);

//     if (!user) {
//       throw new Error("User not found");
//     }

//     // Initialize cart array if it doesn't exist yet
//     if (!user.cart) {
//       user.cart = [];
//     }

//     // Check if product already exists in cart
//     const existingProductIndex = user.cart.findIndex(
//       (product) => product.productId === productId
//     );

//     if (existingProductIndex !== -1) {
//       // If product already exists, update the quantity
//       user.cart[existingProductIndex].quantity += 1;
//     } else {
//       // If product does not exist, add it to the cart
//       user.cart.push({ productId, quantity: 1 });
//     }

//     // Save the user and return the updated cart
//     await user.save();
//     return user.cart;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Server Error");
//   }
// };

// ========= UNARCHIVING PRODUCTS ============
// module.exports.unarchiveProduct = (reqParams, data) => {
//   if (data.isAdmin) {
//     let updateInactiveField = {
//       isActive: true,
//     };

//     return Product.findByIdAndUpdate(
//       reqParams.productId,
//       updateInactiveField
//     ).then((product, error) => {
//       if (product.isActive) {
//         let message = Promise.resolve("Product already active!");
//         return message.then((value) => {
//           return value;
//         });
//       }
//       if (error) {
//         return false;
//       } else {
//         return {
//           message: "Product is now Active!",
//         };
//       }
//     });
//   }
//   let message = Promise.resolve("User must be Admin to use this feature.");
//   return message.then((value) => {
//     return value;
//   });
// };
