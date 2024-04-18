// Import mongoose
const mongoose = require('mongoose');

// Import User model
const User = require('./user.model'); // Adjust the path as needed

// Import Book model
const Book = require('./book.model'); // Adjust the path as needed

// Define CartItem Schema
const CartItemSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // Reference to the Book model
  quantity: { type: Number, default: 1 }
});

// Define Cart Schema
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  items: [CartItemSchema]
});

// Create Cart model
const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
