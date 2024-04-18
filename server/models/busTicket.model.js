const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    zones: [{
        type: String,
        enum: ['Zone 1', 'Zone 2', 'Zone 3']
    }],
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const busCardSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);
const BusCard = mongoose.model('BusCard', busCardSchema);

module.exports = {
    Ticket,
    BusCard
};
