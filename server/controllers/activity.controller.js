
const Activity = require('../models/activity.model');
const activitySelected = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Query the database for activities within the specified period
        const activities = await Activity.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        // Group activities by month
        const activitiesByMonth = {};
        activities.forEach(activity => {
            const monthYear = `${activity.date.getMonth() + 1}-${activity.date.getFullYear()}`;
            if (!activitiesByMonth[monthYear]) {
                activitiesByMonth[monthYear] = [];
            }
            activitiesByMonth[monthYear].push(activity);
        });
   
        res.json(activitiesByMonth);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving activities' });
    }
}

module.exports = activitySelected