const express = require('express');

const  { updateUser,deleteUser,test } = require("../controllers/user.controller");

const verifyToken = require("../utils/verifyUser");

const router  = express.Router()

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get("/",test)
module.exports = router;