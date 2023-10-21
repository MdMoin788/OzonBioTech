import { Product } from "../models/productModel.js"


export const updateStocks = async(productId, productQuantity) => {
    const product = await Product.findById(productId)
    product.stock = product.stock - productQuantity
    await product.save({ validateBeforeSave: false })
}