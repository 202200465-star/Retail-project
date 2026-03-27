const mongoose = require("mongoose");
const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const product = await Product.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || price === undefined || !category || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all product fields",
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      category,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};





// const products = require("../models/productModel");

// const getAllProducts = (req, res) => {
//   res.status(200).json({
//     success: true,
//     count: products.length,
//     data: products,
//   });
// };

// const getProductById = (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     data: product,
//   });
// };

// const createProduct = (req, res) => {
//   const { name, price, category, description } = req.body;

//   if (!name || price === undefined || !category || !description) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide all product fields",
//     });
//   }

//   const newProduct = {
//     id: products.length ? products[products.length - 1].id + 1 : 1,
//     name,
//     price,
//     category,
//     description,
//   };

//   products.push(newProduct);

//   res.status(201).json({
//     success: true,
//     message: "Product created successfully",
//     data: newProduct,
//   });
// };

// const updateProduct = (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   const { name, price, category, description } = req.body;

//   if (name !== undefined) product.name = name;
//   if (price !== undefined) product.price = price;
//   if (category !== undefined) product.category = category;
//   if (description !== undefined) product.description = description;

//   res.status(200).json({
//     success: true,
//     message: "Product updated successfully",
//     data: product,
//   });
// };

// const deleteProduct = (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = products.findIndex((p) => p.id === id);

//   if (index === -1) {
//     return res.status(404).json({
//       success: false,
//       message: "Product not found",
//     });
//   }

//   const deletedProduct = products.splice(index, 1);

//   res.status(200).json({
//     success: true,
//     message: "Product deleted successfully",
//     data: deletedProduct[0],
//   });
// };

// module.exports = {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// };