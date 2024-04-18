const MealPlan = require('../models/mealPlan.model');

const purchaseMealPlan = async (req, res) => {
    try {
        const { studentId, planType } = req.body;

        // Calculate total amount based on plan type
        let amount;
        if (planType === 'monthly') {
            amount = 600;
        } else if (planType === 'semester') {
            amount = 600 * 4 * 0.95; // 5% discount for semester plan
        }

        // Create a new meal plan purchase record
        const mealPlan = new MealPlan({
            studentId,
            type: planType,
            amount
        });
        await mealPlan.save();

        // Handle payment processing with payment gateway

        res.status(201).json(mealPlan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while purchasing meal plan' });
    }
};

module.exports = purchaseMealPlan;
