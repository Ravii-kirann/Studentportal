const mongoose = require('mongoose');

const pollResultSchema = new mongoose.Schema({
    candidate: {
        type: String,
        enum: ['John', 'Mary', 'Susan'],
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});

const PollResult = mongoose.model('PollResult', pollResultSchema);

module.exports = PollResult;
