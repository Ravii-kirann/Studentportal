const Activity = require("../models/activity.model");

const activitySelected = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        console.log("Received request with start date:", startDate, "and end date:", endDate);

        
        const formattedStartDate = new Date(startDate).toISOString();
        const formattedEndDate = new Date(endDate).toISOString();
        console.log("Parsed start date:", formattedStartDate, "Parsed end date:", formattedEndDate);

       
        const activities = await Activity.find({
          
            date: {
                $gte: new Date(formattedStartDate),
                $lte: new Date(formattedEndDate)
            }
        })
        console.log("Retrieved activities:", activities);

      
        const activitiesByMonth = {};
        activities.forEach(activity => {
            const monthYear = `${activity.date.toISOString().slice(5, 7)}-${activity.date.toISOString().slice(0, 4)}`;
            if (!activitiesByMonth[monthYear]) {
                activitiesByMonth[monthYear] = [];
            }
            activitiesByMonth[monthYear].push(activity);
        });

        res.json(activitiesByMonth);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'An error occurred while retrieving activities' });
    }
}
const createActivity = async (req, res) => {
    try {
        // Extract data from request body
        const { name, date, description } = req.body;

        // Parse date string to a Date object
        const parsedDate = new Date(date);

        // Create new activity
        const newActivity = new Activity({
            name,
            date: parsedDate,
            description
        });

        // Save the activity to the database
        const savedActivity = await newActivity.save();

        res.status(201).json(savedActivity); // Send the saved activity as response
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'An error occurred while creating activity' });
    }
}
module.exports = {activitySelected,createActivity};
