const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Get all reviews
router.get('/', reviewController.getReviews);

// Post a new review
router.post('/', reviewController.postReview);

module.exports = router;