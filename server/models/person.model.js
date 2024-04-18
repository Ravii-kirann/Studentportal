const mongoose = require('mongoose');

// Define the schema for students and faculty
const personSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['student', 'faculty'],
        required: true
    }
});

// Create a model for the combined schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
