const express = require('express');
const router = express.Router();
const RoomateSearch = require("../controllers/Roomate.controller")
const verifyToken = require("../utils/verifyUser")
router.get('/search',verifyToken,RoomateSearch );
module.exports = router;
