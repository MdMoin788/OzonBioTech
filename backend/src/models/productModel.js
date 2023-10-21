import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },


    size: {
      type: String,
      required: [true, "Please Enter Product size"],
    },

    features: Array,

    benefit: Array,

    dosage_application: Array,


    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false }
);

export const Product = mongoose.model("Product", productSchema, "products");
