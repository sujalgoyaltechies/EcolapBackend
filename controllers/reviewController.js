// controllers/reviewController.js
const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.postReview = async (req, res) => {
  try {
    const { content, user } = req.body;

    const newReview = new Review({
      content,
      user,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
