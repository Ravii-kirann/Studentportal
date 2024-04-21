const mongoose = require('mongoose');
const User = require('./user.model');

// Define the textbook schema
const textbookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    availability: {
        type: Boolean,
        default: false
    },
    libraryLocation: {
        type: String,
        required: true
    },
    bookstoreName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const purchaseSchema = new mongoose.Schema({
   
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
