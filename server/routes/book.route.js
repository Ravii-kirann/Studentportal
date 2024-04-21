const express = require("express");
const router = express.Router();
const { createBook, searchBook, purchaseTextbook, getUserPurchases } = require('../controllers/book.controller'); // Adjusted import statement
const verifyToken = require("../utils/verifyUser");

router.post('/', createBook);
router.get('/search/:key',verifyToken, searchBook);
router.get('/textbooks/purchase',verifyToken, purchaseTextbook);
router.get('/users/:userId/purchases', getUserPurchases);
module.exports = router;
