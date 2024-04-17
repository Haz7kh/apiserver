const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const fs = require("fs");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/order");
const historyRoutes = require("./routes/history");

const app = express();

// Middleware
app.use(bodyParser.json());

// Load menu data
const menuData = JSON.parse(fs.readFileSync("menu.json"));

// Database setup
const userDB = new Datastore({ filename: "users.db", autoload: true });
const orderDB = new Datastore({ filename: "orders.db", autoload: true });

// Routes
app.use("/auth", authRoutes(userDB));
app.use("/order", orderRoutes(menuData, orderDB));
app.use("/history", historyRoutes(orderDB));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
