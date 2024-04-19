const PollResult = require('../models/votes.model');

// Route to record a vote for a candidate
const castVote = async (req, res) => {
    try {
        const { candidate } = req.body;

        // Find the poll result record for the selected candidate
        let pollResult = await PollResult.findOne({ candidate });

        if (!pollResult) {
            // If the candidate is not found, create a new poll result record
            pollResult = new PollResult({ candidate, votes: 1 });
        } else {
            // If the candidate is found, increment the vote count
            pollResult.votes++;
        }

        // Save the poll result record
        await pollResult.save();

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while recording vote' });
    }
}

// Route to retrieve poll results
const voteresult = async (req, res) => {
    try {
        const { candidate } = req.body;

        // Find the poll result record for the selected candidate
        const pollResult = await PollResult.findOne({ candidate });

        if (!pollResult) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        res.status(200).json({ candidate: pollResult.candidate, votes: pollResult.votes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving poll results' });
    }
}

module.exports = { castVote, voteresult };
