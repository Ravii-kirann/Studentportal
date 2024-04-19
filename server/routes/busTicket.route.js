const express = require('express');
const router = express.Router();
const { purchaseTickets, purchaseBusCards } = require('../controllers/busTicket.controller');
const verifyToken = require("../utils/verifyUser")
// Route to purchase bus tickets
router.post('/tickets',verifyToken, purchaseTickets);

// Route to purchase bus cards
router.post('/bus-cards',verifyToken, purchaseBusCards);

module.exports = router;
