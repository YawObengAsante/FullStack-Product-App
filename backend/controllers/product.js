import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in fecthing Products: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  try {
    const newProduct = await Product.create(product);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product: ", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        details: error.errors,
      });
    }

    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const {id: itemId} = req.params
  const product = req.body
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    res.status(404).json({success: false, message: 'Product not Found'})
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(itemId, product, {
      new: true,
      runValidators: true
    })
    res.status(200).json({success: true, data: updatedProduct})
  } catch (error) {
    res.status(500).json({success:false, message: "Server Error"})
  }

  
}

export const deleteProduct = async (req, res) => {
  const { id: itemId } = req.params;

  if(!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(404).json({success: false, message: "Product not found"})
  }

  try {
    const product = await Product.findByIdAndDelete(itemId);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
