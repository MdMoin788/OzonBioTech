import mongoose from "mongoose";
import { ErrorHandler } from "../utils/errorHandler.js";

export const errorMiddleware = (error, req, res, next) => {

  error.message = error.message || 'Internal Server Error';
  error.statusCode = error.statusCode || 500;


  res.status(error.statusCode)
  .json({
    success: false,
    message: error?.message,
    path: req?.originalUrl
  });  
  
}

export const catchAsyncError = ((callback)=> (req, res, next) => {
  Promise.resolve(callback(req, res, next)).catch(next)
})

export const validateMongooseId = (req, res, next)=> {
  return mongoose.Types.ObjectId.isValid(req.params.id) ? next() : next(new ErrorHandler(`Invalid Id: ${req.params.id}`, 400))
}