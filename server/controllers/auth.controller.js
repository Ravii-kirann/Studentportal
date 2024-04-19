const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const errorHandler = require('../utils/error');
const jwt  = require('jsonwebtoken');
const sendEmail = require('../utils/email')
const test = (req, res) => {
 // console.log(req.body,"req.body")
  res.json({
    message: 'API is working!',
  });
}

const Register = async (req, res, next) => {
  console.log(req.body,"req.body")
  try {
    const { password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
   
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      email: req.body.email,
      loginName: req.body.loginName,
      password: hashedPassword,
      // Add other fields as needed
    });
    res.status(201).json({ status: 'ok', data: user });
  } catch (error) {
    console.error('Error creating user:', error);
    next(errorHandler(500, 'Failed to create user'));
  }
}

const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ loginName: req.body.loginName });
    if (!user) {
      return next(errorHandler(404, 'User not found!'));
    }
    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid email or password'));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    next(errorHandler(500, 'Failed to log in'));
  }
}

const LogOut = async (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
}



const forgotPassword = async (req, res) => {
    try {
        if (!req.body.email || typeof req.body.email !== 'string' || !req.body.email.includes('@')) {
            return res.status(400).send("Invalid email address");
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("User with given email doesn't exist");
        }

        const secret = process.env.JWT_SECRET; // Use a fixed secret for generating token
        const payload = {
            email: user.email,
            id: user._id
        };

        const token = jwt.sign(payload, secret, { expiresIn: '15m' });

        // Construct the reset password link
        const link = `http://localhost:1337/reset-password/${user._id}/${token}`;
        console.log("Password reset link has been sent to your email:", link);
        res.send("Password reset link has been sent to your email");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

const resetPassword = async (req, res) => {
    try {
        const { id, token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).send('Password does not match confirm password');
        }

        // Validate email, token, and password
        if (!id || !token || !password) {
            return res.status(400).send("Missing required parameters");
        }

        // Find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).send("User not found");
        }

        // Verify the token
        const secret = process.env.JWT_SECRET; // Use the same secret for verification
        const payload = jwt.verify(token, secret);

        if (payload.id !== id) {
            return res.status(400).send("Invalid or expired password reset link");
        }

        // Update user's password
        user.password = password;
        await user.save();

        res.send("Password reset successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};








module.exports = { Register, Login, LogOut, test ,forgotPassword,resetPassword };
