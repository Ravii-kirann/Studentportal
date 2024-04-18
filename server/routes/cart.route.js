const express = require('express')
const {AddToCart,GetCart} = require("../controllers/cart.controller")
const router = express.Router()

router.post('/add-to-cart/:bookId',AddToCart );
  
  // Route to get the cart and calculate total amount
  router.get('/cart', GetCart);