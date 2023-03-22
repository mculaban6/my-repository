const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();

// ROUTES
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

//========= CONNECT EXPRESS =============
const app = express();
const port = process.env.PORT || 3011;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== CONNECT MONGOOSE ==============
mongoose.connect(
  `mongodb+srv://mculaban6:${process.env.PASSWORD}@cluster0.ltc6n0r.mongodb.net/e-commerce-api?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.on("open", () => console.log("Connected to MongoDB."));

//============= ROUTES FOR USERS, PRODUCTS AND ORDERS===============
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.listen(port, () => console.log(`API is now online on port ${port}`));
