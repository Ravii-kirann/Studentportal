const express = require('express');
const router = express.Router();
const {RoommateSearch, createRoommate} = require("../controllers/Roomate.controller")
const verifyToken = require("../utils/verifyUser")
router.get('/search',verifyToken, RoommateSearch );
router.post('/',createRoommate)

module.exports = router;
