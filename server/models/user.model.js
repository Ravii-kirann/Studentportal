const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  loginName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String, // For password reset functionality
  resetPasswordExpires: Date,
},{timestamps: true});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
