const Activity = require("../models/activity.model");

const activitySelected = async (req, res) => {
    try {
        const { startDate, endDate } = req.params;
        console.log("Received request with start date:", startDate, "and end date:", endDate);

        // Ensure dates are in ISO format
        const formattedStartDate = new Date(startDate);
        const formattedEndDate = new Date(endDate);
        console.log("Parsed start date:", formattedStartDate, "Parsed end date:", formattedEndDate);

        // Query the database for activities within the specified period
        const activities = await Activity.find({
            date: {
                $gte: formattedStartDate,
                $lte: formattedEndDate
            },
            name: { $exists: true, $ne: null } // Ensure that 'name' is not null or undefined
        }).select('name date description'); // Selecting only the required fields
        console.log("Retrieved activities:", activities);

        // Group activities by month
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
      
        let { name, date, description, selected } = req.body;

      
        const parsedDate = new Date(date);

      
        if (selected === undefined) {
            selected = false;
        }

       
        const newActivity = new Activity({
            name,
            date: parsedDate,
            description,
            selected
        });

     
        const savedActivity = await newActivity.save();

        res.status(201).json(savedActivity); // Send the saved activity as response
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'An error occurred while creating activity' });
    }
};

const getSelectedActivities = async (req, res) => {
    try {
        
        const selectedActivities = await Activity.find({ selected: true });

    
        res.status(200).json(selectedActivities);
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
};
const updateActivitySelectedStatus = async (req, res) => {
    const  {id}  = req.params;
    const  {selected}  = req.body;

    try {
        // Find the activity by ID
        const activity = await Activity.findById(id);

        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
         if(selected == undefined){
            selected = false
         }
        // Update the selected property
        activity.selected = selected;

        // Save the updated activity
        const updatedActivity = await activity.save();

        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while updating the activity' });
    }
};
const test =(req,res)=>{
   res.send("working")
}
module.exports = {activitySelected,createActivity,test,getSelectedActivities,updateActivitySelectedStatus};
