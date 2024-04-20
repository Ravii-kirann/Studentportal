const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser')
const {activitySelected,createActivity} = require('../controllers/activity.controller')


router.post('/',verifyToken,activitySelected);
router.post('/',createActivity)

module.exports = router;