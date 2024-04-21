
const mongoose = require('mongoose');
const { Textbook, Purchase, Student } = require('../models/book.model');

const createBook = async (req, res) => {
    try {
        const { title, author, isbn, availability, libraryLocation, bookstoreName, price } = req.body;
        console.log("req.body", req.body);

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
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'An error occurred while creating the book' });
    }
};

const searchBook = async (req, res) => {
    try {
        console.log(req.params.key);

        let data = await Textbook.find({
            $or: [
                { "title": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for title
                { "author": { $regex: new RegExp(req.params.key, 'i') } }, // Case-insensitive search for author
                { "isbn": { $regex: new RegExp(req.params.key, 'i') } } // Case-insensitive search for ISBN
            ]
        });
        res.send(data);
    } catch (error) {
        console.error('Error searching book:', error);
        res.status(500).send("An error occurred");
    }
};


const purchaseTextbook = async (req, res) => {
    try {
        console.log(req.body, "reqqqq"); 
        const {  textbookId } = req.body;

        const book = await Textbook.findById(textbookId);
        
        console.log("book,,,,,,,,", book);
       

        const price = book.price;
        console.log("priceeeeeeee", price);
        for (const purchase of purchases) {
            totalAmount += purchase.totalAmount;
        }

        // Calculate the discount
        let discountApplied = false;
        if (totalAmount + price > 200) {
            price *= 0.9; // Apply 10% discount
            discountApplied = true;
        }

        const purchase = new Purchase({
            
            textbooks: [textbookId],
            purchaseDate: new Date(),
            totalAmount: price
        });

        await purchase.save();

        res.status(201).json({ message: 'Textbook purchased successfully' });
    } catch (error) {
        console.error('Error purchasing textbook:', error);
        res.status(500).json({ error: 'An error occurred while purchasing textbook' });
    }
}; 



// Controller for retrieving purchase history
const getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve purchase history for the specified user
        const purchases = await Purchase.find({ userId }).populate('textbookId');

        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error retrieving purchase history:', error);
        res.status(500).json({ error: 'An error occurred while retrieving purchase history' });
    }
};

module.exports = { createBook, searchBook, purchaseTextbook, getPurchaseHistory };