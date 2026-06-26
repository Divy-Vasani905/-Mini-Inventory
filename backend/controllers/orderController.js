const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.productId", "name sku")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        productId: product._id,

        quantity: item.quantity,

        price: product.price,
      });

      product.stock -= item.quantity;

      await product.save();
    }

    const order = await Order.create({
      customerName,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    if (status === "Cancelled") {
      for (const item of order.items) {
        const product = await Product.findById(item.productId);

        if (product) {
          product.stock += item.quantity;

          await product.save();
        }
      }
    }

    order.status = status;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
