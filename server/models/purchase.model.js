const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
    textbooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Textbook'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    discountApplied: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
