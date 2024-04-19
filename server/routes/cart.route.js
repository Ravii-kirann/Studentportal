const express = require('express')
const {AddToCart,GetCart} = require("../controllers/cart.controller")
const router = express.Router()
const verifyToken = require("../utils/verifyUser")
router.post('/add-to-cart/:bookId',verifyToken,AddToCart );
  
  // Route to get the cart and calculate total amount
  router.get('/cart',verifyToken, GetCart);