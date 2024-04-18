const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: String
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
