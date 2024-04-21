const mongoose = require('mongoose');

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
    },
    purchasedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});



// Create models using the schemas
const Textbook = mongoose.model('Textbook', textbookSchema);


module.exports = Textbook;

