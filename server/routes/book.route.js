const express = require("express");
const router = express.Router();
const {creatBook,searchBook ,purchaseTextbook,getPurchaseHistory } = require('../controllers/book.controller'); // Adjusted import statement
const verifyToken = require("../utils/verifyUser");

router.post('/', creatBook);
router.get('/search/:key',verifyToken, searchBook);
router.get('/textbooks/purchase',verifyToken, purchaseTextbook);
router.get('/users/:userId/purchases', getPurchaseHistory);
module.exports = router;
