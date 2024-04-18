const express = require("express");
const router = express.Router();
const { creatBook,searchBook } = require('../controllers/book.controller'); // Adjusted import statement
const verifyToken = require("../utils/verifyUser");

router.post('/book', creatBook);
router.get('/search/:key',verifyToken, searchBook);
module.exports = router;
