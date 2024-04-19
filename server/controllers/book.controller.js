const {Textbook, Purchase, Student} = require('../models/book.model');


const creatBook =async (req, res) => {
    try {
        const { title, author, isbn, availability, libraryLocation, bookstoreName,price } = req.body;
          console.log("req.body",req.body)
        // Create a new book instance
        const newBook = new Textbook({
            title : req.body.title,
            author : req.body.author,
            isbn: req.body.isbn,
            availability : req.body.availability,
            libraryLocation : req.body.libraryLocation,
            bookstoreName : req.body.bookstoreName,
            price : req.body.price
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
const purchaseTextbook = async (req, res) => {
    try {
        console.log(req.body, "reqqqq"); // Corrected to log req.body
        const { userId, textbookId } = req.body;

        // Create a purchase record
        const purchase = new Purchase({
            userId,
            textbookId,
            purchaseDate: new Date()
        });

        // Save the purchase record to the database
        await purchase.save();

        // Check if the total amount spent by the user exceeds $200
        const totalSpent = await Purchase.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
        ]);
        
        if (totalSpent.length > 0 && totalSpent[0].totalAmount > 200) {
            // Apply a 10% discount for the next purchase
            // You can store this information in the user's document for future use
            // For example: await User.findByIdAndUpdate(userId, { $set: { discount: 0.1 } });
            console.log('Discount of 10% applied for the next purchase.');
        }

        res.status(201).json({ message: 'Textbook purchased successfully' });
    } catch (error) {
        console.error('Error purchasing textbook:', error);
        res.status(500).json({ error: 'An error occurred while purchasing textbook' });
    }
}


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
}


module.exports = {creatBook,searchBook ,purchaseTextbook,getPurchaseHistory}