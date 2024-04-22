const { Ticket, BusCard } = require('../models/busTicket.model');

const purchaseTickets = async (req, res) => {
    try {
        
        const { zones, quantity } = req.body;

        // Calculate total amount for tickets based on selected zones and quantity
        let ticketAmount = 0;
        zone => {
            if (zone === 'Zone-1') ticketAmount += 2;
            else if (zone === 'Zone-2') ticketAmount += 4;
            else if (zone === 'Zone-3') ticketAmount += 6;
        }
        ticketAmount *= quantity;

        // Create a new ticket purchase record
        const ticket = new Ticket({
            zones,
            quantity,
            amount: ticketAmount
        });
        await ticket.save();

        // Handle payment processing with payment gateway

        res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while purchasing bus tickets' });
    }
};

const purchaseBusCards = async (req, res) => {
    try {
        const { quantity } = req.body;

        // Calculate total amount for bus cards based on quantity
        const busCardAmount = 40 * quantity;

        // Create a new bus card purchase record
        const busCard = new BusCard({
            quantity,
            amount: busCardAmount
        });
        await busCard.save();

        // Handle payment processing with payment gateway

        res.status(201).json(busCard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while purchasing bus cards' });
    }
};

module.exports = {
    purchaseTickets,
    purchaseBusCards
};
