const Person = require('../models/person.model');


const createPerson =async (req, res) => {
    try {
        const { firstName, lastName, department, phoneNumber, email, type } = req.body;

        // Create a new person instance
        const newPerson = new Person({
            firstName,
            lastName,
            department,
            phoneNumber,
            email,
            type
        });

        // Save the new person to the database
        await newPerson.save();

        // Send a success response
        res.status(201).json({ message: 'Person created successfully', person: newPerson });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the person' });
    }
}

const searchPerson = async (req, res) => {
    try {
        console.log(req.params.key);

        let data = await Person.find({
            $or: [
                { "firstName": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for first name
                { "lastName": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for last name
                { "department": { $regex: new RegExp(req.params.key, 'i') } } // Case-insensitive search for department
            ]
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports = {createPerson,searchPerson}