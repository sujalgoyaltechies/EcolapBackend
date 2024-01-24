const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/users');
const { v4: uuidv4 } = require('uuid');

const signUp = async (req, res) => {
    const { name, email, number, password, confPassword } = req.body;
    const token = uuidv4();
    const errors = [];

    if (!name) {
        errors.push("Please enter a name");
    }
    if (!email) {
        errors.push("Please enter an email");
    }
    if (!number) {
        errors.push("Please enter a phone number");
    }
    if (number.length !== 10) {
        errors.push("Number should be 10 digits long");
    }
    if (!password) {
        errors.push("Please enter a password");
    }
    if (password !== confPassword) {
        errors.push("Password and Confirm Password should be the same");
    }
    if (!validator.isEmail(email)) {
        errors.push("Please enter a valid email");
    }
    if (password.length < 8) {
        errors.push("Password should be at least 8 characters long");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 8);
            const user = new User({
                name,
                email,
                number,
                hashedPassword,
                token,
            });
            const savedUser = await user.save();

            if (!savedUser) {
                res.status(500).send({ message: "Error occurred" });
            } else {
                res.status(200).send({ message: "Successful" });
            }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
                res.status(409).json({ message: "Email is already in use, please enter a unique email" });
            } else {
                console.error(error);
                res.status(500).json({ message: "Error in catch" });
            }
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const errors = [];

    if (!email) {
        errors.push("Please provide the email");
    }
    if (!password) {
        errors.push("Please provide the password");
    }
    if (!validator.isEmail(email)) {
        errors.push("Please enter a valid email");
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    const user = await User.findOne({ email });

    if (!user) {
        errors.push("This email is not registered");
        res.status(400).json({ errors });
        return;
    }

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!checkPassword) {
        errors.push("Wrong password");
        res.status(400).json({ errors });
        return;
    }

    res.status(201).send({ userData: user, message: "Logged in" });
};

module.exports = { signUp, login };
