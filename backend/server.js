const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
