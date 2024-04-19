const express = require('express');
const router = express.Router();
const {castVote,voteresult} = require("../controllers/votes.controller")
router.post('/vote', castVote);
router.get('/results',voteresult);

module.exports = router