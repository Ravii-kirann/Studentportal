const mongoose = require('mongoose');

// Define the roommate schema
const roommateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    moveInDate: {
        type: Date,
        required: true
    },
    priceRange: {
        min: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            required: true
        }
    },
    // Other preferences can be added here
});

// Create a model using the schema
const Roommate = mongoose.model('Roommate', roommateSchema);

module.exports = Roommate;
