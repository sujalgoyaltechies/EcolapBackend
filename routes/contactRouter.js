// routes/contactRouter.js
const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

// Get all contacts
router.get('/', contactController.getContacts);

// Post a new contact
router.post('/', contactController.postContact);

module.exports = router;
