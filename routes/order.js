// routes/order.js
const express = require("express");
const router = express.Router();
const createOrder = require("../models/order");

module.exports = (menuData, orderDB) => {
  router.post("/add", (req, res) => {
    const { userId, products } = req.body;

    // Get product prices from the menu
    console.log(menuData.menu);
    const orderedProducts = products.map((productId) => {
      const id = parseInt(productId, 10);
      const product = menuData.menu.find((product) => product.id === id);
      return product ? product.price : 0; // Return 0 if product not found
    });

    // Calculate total price
    const totalPrice = orderedProducts.reduce(
      (total, price) => total + price,
      0
    );

    // Create order object
    const order = createOrder(userId, products, totalPrice);

    // Insert order into the database
    orderDB.insert(order, (err, newOrder) => {
      if (err) {
        res.status(500).json({ error: "Failed to add order" });
      } else {
        res.status(201).json({ order: newOrder });
      }
    });
  });

  router.get("/orders", (req, res) => {
    console.log("GET request received for /order/orders");
    orderDB.find({}, (err, orders) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch orders" });
      } else {
        res.status(200).json(orders);
      }
    });
  });

  return router;
};
