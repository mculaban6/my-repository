const User = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../auth");
//const Product = require("../models/product");
const { findOne } = require("../models/user");
const Product = require("../models/product");

module.exports.checkEmailExists = (reqBody) => {
  return User.find({ email: reqBody.email }).then((result) => {
    // the find method returns a record if a match is found

    if (result.length > 0) {
      return true;
    }

    return false;
  });
};

// =========== REGISTRATION =============
module.exports.registerUser = (reqBody) => {
  let newUser = new User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password, 10),
  });

  return newUser.save().then((user, error) => {
    if (error) {
      return false;
    } else {
      return user;
    }
  });
};

// Retrieve User Details
module.exports.getProfile = (userData) => {
  return User.findOne({ id: userData.id }).then((result) => {
    if (result == null) {
      return false;
    } else {
      result.password = ""; // tanggalin ung password
      return result;
    }
  });
};
//=-==== experiment
module.exports.userDetails = (userData) => {
  return User.findOne({ email: userData.email }).then((result) => {
    if (result == null) {
      return false;
    } else {
      result.password = ""; // tanggalin ung password
      return result;
    }
  });
};

//===== USER AUTHENTICATION ========

module.exports.loginUser = (data) => {
  return User.findOne({ email: data.email }).then((result) => {
    if (result == null) {
      return {
        message: "Not found in our database",
      };
    } else {
      // The "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns "true" or "false" value depending on the result
      const isPasswordCorrect = bcrypt.compareSync(
        data.password,
        result.password
      );

      if (isPasswordCorrect) {
        return { access: auth.createAccessToken(result) };
      } else {
        // if password doesn't match
        return {
          message: "password was incorrect",
        };
      }
    }
  });
};

// ======= GET ALL USERS ======
// module.exports.getAllUsers = (data) => {
//   if (data.isAdmin) {
//     return User.find({}).then((result) => {
//       return result;
//     });
//   } else {
//     let message = Promise.resolve("User must be Admin to Access this.");

//     return message.then((value) => {
//       return value;
//     });
//   }
// };
module.exports.getAllUsers = (data) => {
  // if(data.isAdmin){
  return User.find({}).then((result) => {
    return result;
  });
};

//====AddTocart===(enroll)
module.exports.addToCart = async (data) => {
  let isUserUpdated = await User.findById(data.userId).then((user) => {
    user.cart.push({ productId: data.productId });

    return user.save().then((user, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  });

  let isCartUpdated = await Product.findById(data.productId).then((product) => {
    product.cart.push({ userId: data.userId });

    return product.save().then((product, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  });

  if (isUserUpdated && isCartUpdated) {
    return {
      message: "Item Added",
    };
  } else {
    return false;
  }
};

module.exports.enroll = async (data) => {
  let isUserUpdated = await User.findById(data.userId).then((user) => {
    user.enrollments.push({ courseId: data.courseId });

    return user.save().then((user, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  });

  let isProductUpdated = await Product.findById(data.courseId).then(
    (course) => {
      // Adds the userId in the course's enrollees array
      product.enrollees.push({ userId: data.userId });

      // Saves the updated course information in the database
      return product.save().then((product, error) => {
        if (error) {
          return false;
        } else {
          return true;
        }
      });
    }
  );

  // Condition that will check if the user and course documents have been updated
  // User enrollment successful
  if (isUserUpdated && isProductUpdated) {
    return {
      message: "Product Added",
    };
    // User enrollment failure
  } else {
    return false;
  }
};

// update user Admin Status

module.exports.setUserToNotAdmin = (reqParams) => {
  let updateActiveField = {
    isAdmin: false,
  };

  return User.findByIdAndUpdate(reqParams.userId, updateActiveField).then(
    (user, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "setting Admin successfull",
        };
      }
    }
  );
};

module.exports.setUserToAdmin = (reqParams) => {
  let updateActiveField = {
    isAdmin: true,
  };

  return User.findByIdAndUpdate(reqParams.userId, updateActiveField).then(
    (user, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "set Admin successfully",
        };
      }
    }
  );
};

// delete user ======

module.exports.deleteUser = (reqParams) => {
  return User.findByIdAndRemove(reqParams.userId).then((result, err) => {
    return { message: "user deleted" };
  });
};

// update user details
module.exports.updateUser = (reqParams, reqBody) => {
  let updatedUser = {
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    permanentAddress: reqBody.permanentAddress,
    shippingAddress: reqBody.shippingAddress,
    password: reqBody.password,
  };
  return User.findByIdAndUpdate(reqParams.userId, updatedUser).then(
    (product, error) => {
      if (error) {
        return false;
      } else {
        return {
          message: "User updated successfully",
        };
      }
    }
  );
};
