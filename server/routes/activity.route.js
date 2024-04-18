const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser')
const activitySelected = require('../controllers/activity.controller')
router.get('/activities',verifyToken,activitySelected);


module.exports = router;