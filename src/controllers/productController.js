import { Product } from "../models/productModel.js";
import { ErrorHandler } from "../utils/errorHandler.js";

// Only Admin can do
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(new ErrorHandler(error, 500));
  }
}

// Get all products
export const getAllProducts = async (req, res, next) => {
  console.log("search query", req.query);
  let newQuery = { ...req.query }
  if (req.query.name) {
    newQuery = { title: { $regex: req.query.name, $options: 'i' } }

  }
  console.log('newQuery', newQuery);
  try {
    const products = await Product.find(newQuery).lean().exec();
    res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.log("get all products error", error);
    return next(new ErrorHandler(error.message, 500));
  }
};

// get single product
export const getSingleProduct = async (req, res, next) => {
  console.log("req.params", req.params);
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('error from getSingleProduct', error.message);
    return next(new ErrorHandler(error.message, 500));
  }
};

// Update product only Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("update product error", error);
    next(new ErrorHandler(error.message, 500));
  }
};

// Delete a Product only Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: `Product deleted successfully` });
  } catch (error) {
    console.log("delete product error", error);
    next(new ErrorHandler(error.message, 500));
  }
};


