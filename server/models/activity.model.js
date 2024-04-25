const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    description: String,
    selected: {
        type: Boolean,
        default: false // Setting the default value to false
    }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
