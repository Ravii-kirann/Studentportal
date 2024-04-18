
const Roommate = require('../models/roomate.model');

// Route to search for roommates based on preferences with pagination

const RoomateSearch = async (req, res) => {
    try {
        const { gender, moveInDate, minPrice, maxPrice, page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;

        // Construct the search query based on the provided preferences
        const searchQuery = {};
        if (gender) {
            searchQuery.gender = gender;
        }
        if (moveInDate) {
            searchQuery.moveInDate = { $gte: new Date(moveInDate) }; // Find roommates available on or after the specified move-in date
        }
        if (minPrice && maxPrice) {
            searchQuery['priceRange.min'] = { $gte: minPrice };
            searchQuery['priceRange.max'] = { $lte: maxPrice };
        }

        // Query the database for roommates matching the search criteria with pagination
        const roommates = await Roommate.find(searchQuery)
            .skip((pageNumber - 1) * pageSize)
            
            .limit(pageSize);

        res.json(roommates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for roommates' });
    }
}

module.exports = RoomateSearch;
