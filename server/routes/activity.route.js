const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser')
const {activitySelected,createActivity,test} = require('../controllers/activity.controller')

router.get("/test",test)
router.get('/:startDate/:endDate', verifyToken, activitySelected);

router.post('/',createActivity)

module.exports = router;