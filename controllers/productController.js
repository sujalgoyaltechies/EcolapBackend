const Product = require('../models/productModel');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dw2cztw1w',
  api_key: '188955532736555',
  api_secret: 'pEtNsnCHRa589s_mfB1DRAmb93E',
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});



const createProduct = async (req, res) => {
  try {
    const {
      name,
      title,
      originalPrice,
      brand,
      model,
      year,
      condition,
      processor,
      memory,
      storage,
      graphics,
      display,
      stockQuantity,
      Price,
    } = req.body;

    let img;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploads', // Set the folder in Cloudinary
      });

      img = result.secure_url; // Store the secure URL in the database

      // Optionally, you can remove the local file after uploading to Cloudinary
      const fs = require('fs');
      fs.unlinkSync(req.file.path);
    }

    const newProduct = new Product({
      name,
      title,
      originalPrice,
      brand,
      model,
      year,
      condition,
      processor,
      memory,
      storage,
      graphics,
      display,
      stockQuantity,
      Price,
      img,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(deletedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};




module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
