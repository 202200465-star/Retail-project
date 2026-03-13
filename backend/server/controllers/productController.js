const products = require("../models/productModel");

const getAllProducts = (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
};

const createProduct = (req, res) => {
  const { name, price, category, description } = req.body;

  if (!name || price === undefined || !category || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all product fields",
    });
  }

  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    category,
    description,
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const { name, price, category, description } = req.body;

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (category !== undefined) product.category = category;
  if (description !== undefined) product.description = description;

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deletedProduct[0],
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};