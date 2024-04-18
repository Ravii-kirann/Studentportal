const express = require('express');
const router = express.Router();
const { purchaseTickets, purchaseBusCards } = require('../controllers/busTicket.controller');

// Route to purchase bus tickets
router.post('/tickets', purchaseTickets);

// Route to purchase bus cards
router.post('/bus-cards', purchaseBusCards);

module.exports = router;
