const express = require("express");
const router = express.Router();
const Datastore = require("nedb");

// Initialize NeDB database for order history
const orderHistoryDB = new Datastore({
  filename: "orderHistory.db",
  autoload: true,
});

module.exports = () => {
  router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    // Find orders by user ID in the order history database
    orderHistoryDB.find({ userId }, (err, orders) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch order history" });
      } else {
        res.status(200).json(orders);
      }
    });
  });

  return router;
};
