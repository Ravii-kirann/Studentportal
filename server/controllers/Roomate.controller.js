const Roommate = require('../models/roomate.model');

// Route to search for roommates based on preferences with pagination
const RoommateSearch = async (req, res) => {
    try {
        const { gender, moveInDate, approxPrice, page = 1, limit = 10 } = req.query;
        console.log(req.query,"req.query")
        // Construct the search query based on the provided preferences
        const searchQuery = {};
        if (gender) {
            searchQuery.gender = gender;
        }
        if (moveInDate) {
            searchQuery.moveInDate = { $gte: new Date(moveInDate) }; // Find roommates available on or after the specified move-in date
        }
        if (approxPrice) {
            searchQuery['priceRange.min'] = { $lte: approxPrice }; // Find roommates with price range less than or equal to approxPrice
        }

        // Query the database for roommates matching the search criteria with pagination
        const roommates = await Roommate.find(searchQuery)
            .skip((page - 1) * limit)
            .limit(limit);
         console.log(roommates,"roomates")
        res.json(roommates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for roommates' });
    }
}

// Route to create a new roommate
const createRoommate = async (req, res) => {
    try {
        const { name, gender, moveInDate, priceRange } = req.body;

        // Create a new roommate document
        const roommate = new Roommate({
            name,
            gender,
            moveInDate: new Date(moveInDate),
            priceRange: {
                min: priceRange.min,
                max: priceRange.max
            }
            // Add other fields as needed
        });

        // Save the roommate document to the database
        await roommate.save();

        res.status(201).json(roommate);
        console.log(roommate)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating a roommate' });
    }
}

module.exports = { RoommateSearch, createRoommate };
