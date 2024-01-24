const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.postContact = async (req, res) => {
  try {
    const { name, email, number, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      number,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};