const mongoose = require('mongoose');
const User = require('./user.model');

// Define the textbook schema
const textbookSchema = new mongoose.Schema({
    // Define textbook schema fields...
});

const purchaseSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Assuming 'Student' is an alias for 'User' in your application
        required: true
    },
    textbooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Textbook'
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

// Create models using the schemas
const Textbook = mongoose.model('Textbook', textbookSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);
const Student = User; // Assuming 'Student' is an alias for 'User' in your application

module.exports = {
    Textbook,
    Purchase,
    Student
};
