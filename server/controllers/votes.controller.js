const express = require('express');
const router = express.Router();
const PollResult = require('../models/votes.model');

// Route to record a vote for a candidate
router.post('/vote', async (req, res) => {
    try {
        const { candidate } = req.body;

        // Find the poll result record for the selected candidate
        const pollResult = await PollResult.findOne({ candidate });
        if (!pollResult) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        // Increment the vote count for the selected candidate
        pollResult.votes++;
        await pollResult.save();

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while recording vote' });
    }
});

// Route to retrieve poll results
router.get('/results', async (req, res) => {
    try {
        // Retrieve poll results from the database
        const pollResults = await PollResult.find();

        // Calculate total votes
        const totalVotes = pollResults.reduce((total, result) => total + result.votes, 0);

        res.json({ pollResults, totalVotes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poll results' });
    }
});

module.exports = router;
