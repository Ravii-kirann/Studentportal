const express = require('express');
const router = express.Router();
const  purchaseMealPlan  = require('../controllers/mealplan.controller');
const verifyToken = require("../utils/verifyUser")
// Route for purchasing meal plans
router.post('/purchase',verifyToken ,purchaseMealPlan);

module.exports = router;
