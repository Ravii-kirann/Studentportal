const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyUser')
const {activitySelected,createActivity,test,getSelectedActivities,updateActivitySelectedStatus} = require('../controllers/activity.controller')

router.get("/test",test)
router.get('/:startDate/:endDate', verifyToken, activitySelected);
router.get('/selected-activities',verifyToken, getSelectedActivities);
router.post('/',createActivity)
router.patch('/activities/:id/update-selected',verifyToken, updateActivitySelectedStatus);
module.exports = router;