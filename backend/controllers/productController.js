const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({
      sku: req.body.sku,
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const existingSKU = await Product.findOne({
      sku: req.body.sku,
      _id: { $ne: req.params.id },
    });

    if (existingSKU) {
      return res.status(400).json({
        message: "SKU already exists",
      });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
