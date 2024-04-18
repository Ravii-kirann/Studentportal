const express = require("express");
const router = express.Router();
const { createPerson,searchPerson } = require('../controllers/person.controller'); // Adjusted import statement
const verifyToken = require("../utils/verifyUser");

router.post('/person', createPerson);
router.get('/search/:key',verifyToken, searchPerson);
module.exports = router;
