const express = require('express');
const {Register,Login,LogOut,test,resetPassword,forgotPassword} = require('../controllers/auth.controller');

const router = express.Router();
const verifyToken = require("../utils/verifyUser")

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',LogOut );
router.get('/',test)
router.post('/forgot-password',forgotPassword);
router.get('/reset-password/:id/:token', resetPassword);

module.exports = router;