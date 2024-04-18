const {Textbook, Purchase, Student} = require('../models/book.model');


const creatBook =async (req, res) => {
    try {
        const { title, author, isbn, availability, libraryLocation, bookstoreName,price } = req.body;

        // Create a new book instance
        const newBook = new Textbook({
            title,
            author,
            isbn,
            availability,
            libraryLocation,
            bookstoreName,
            price
        });

        // Save the new book to the database
        await newBook.save();

        // Send a success response
        res.status(201).json({ message: 'book created successfully', book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the book' });
    }
}

const searchBook = async (req, res) => {
    try {
        console.log(req.params.key);

        let data = await Textbook.find({
            $or: [
                { "title": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for first name
                { "author": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for last name
                { "isbn": { $regex: new RegExp(req.params.key, 'i') } } // Case-insensitive search for department
            ]
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
};

module.exports = {creatBook,searchBook}