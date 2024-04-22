const express = require('express');
const router = express.Router();
const {castVote,voteresult} = require("../controllers/votes.controller")
router.post('/', castVote);
router.post('/results',voteresult);

module.exports = router