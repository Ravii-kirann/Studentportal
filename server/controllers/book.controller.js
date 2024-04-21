
const  Textbook  = require('../models/book.model');
const Purchase = require('../models/purchase.model');
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
        const { textbookID,UserId } = req.body;
       console.log("req.body",textbookID,UserId)
     
        let totalPrice = 0;
    
            const textbook = await Textbook.findById(textbookID);
            console.log(textbook)
            if (!textbook) {
                return res.status(404).json({ error: `Textbook with ID ${textbookID} not found` });
            }
            totalPrice += textbook.price;
        

    
        const userPurchases = await Purchase.find({UserId });
        let discountApplied = false;
        let totalPurchaseAmount = 0;
        for (const purchase of userPurchases) {
            totalPurchaseAmount += purchase.totalPrice;
        }
        if (totalPurchaseAmount > 200) {
            discountApplied = true;
            totalPrice *= 0.9; // 10% discount
        }
        const textbooks = textbook._id
        // Create the purchase
        const purchase = new Purchase({
            textbooks,
            totalPrice,
            discountApplied,
            user: req.user.id
        });
        await purchase.save();

        res.status(201).json(purchase);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'An error occurred while purchasing textbooks' });
    }
}



// Controller for retrieving purchase history
const getUserPurchases = async (req, res) => {
    try {
       const {userId} = res.body
        const userPurchases = await Purchase.find(userId)
            .populate('textbooks', 'name price');

        res.json(userPurchases);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: 'An error occurred while retrieving purchases' });
    }
}

module.exports = { createBook, searchBook, purchaseTextbook, getUserPurchases };