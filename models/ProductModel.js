const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    processor: String,
    memory: String,
    storage: String,
    graphics: String,
    display: String,
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    Price: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
