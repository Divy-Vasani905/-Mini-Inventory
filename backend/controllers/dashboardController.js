const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardSummary = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    // stock <= reorderLevel
    const lowStockProducts = await Product.countDocuments({
      $expr: {
        $lte: ["$stock", "$reorderLevel"],
      },
    });

    res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      lowStockProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
