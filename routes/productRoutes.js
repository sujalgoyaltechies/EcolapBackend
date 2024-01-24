// productRoutes.js
const express = require('express');
const multer = require('multer');
const productController = require('../controllers/productController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new product
router.post('/', upload.single('img'), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get a single product by ID
router.get('/:productId', productController.getProductById);

// Update a product by ID
router.put('/:productId', upload.single('img'), productController.updateProduct);

// Delete a product by ID
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
