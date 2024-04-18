const Cart = require('../models/cart.model')
const {Textbook} = require('../models/book.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AddToCart = async (req, res) => {
    try {
      const { bookId } = req.params;
      const { userId } = req.user; // Assuming user is authenticated and userId is available in req.user
  
      // Check if the book exists
      const book = await Textbook.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Find the user's cart or create a new one
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      // Check if the book is already in the cart
      const existingItemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);
      if (existingItemIndex !== -1) {
        // If the book is already in the cart, increment the quantity
        cart.items[existingItemIndex].quantity++;
      } else {
        // If the book is not in the cart, add it
        cart.items.push({ bookId, quantity: 1 });
      }
  
      // Save the cart
      await cart.save();
  
      res.json({ message: 'Book added to cart successfully' });
    } catch (error) {
      console.error('Error adding book to cart:', error);
      res.status(500).json({ error: 'Failed to add book to cart' });
    }
  }

  const GetCart = async (req, res) => {
    try {
      const { userId } = req.user; // Assuming user is authenticated and userId is available in req.user
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId }).populate('items.bookId');
  
      // Calculate total amount
      let totalAmount = 0;
      if (cart) {
        for (const item of cart.items) {
          totalAmount += item.bookId.price * item.quantity;
        }
      }
  
      res.json({ cart, totalAmount });
    } catch (error) {
      console.error('Error getting cart:', error);
      res.status(500).json({ error: 'Failed to get cart' });
    }
  }

  const createPaymentIntent = async (req, res) => {
    try {
      const { totalAmount } = req.body;
      if (totalAmount > 200) {
        totalAmount *= 0.9; // Apply 10% discount
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // Stripe expects amount in cents
        currency: 'usd',
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }
  
  module.exports = { AddToCart, GetCart, createPaymentIntent };