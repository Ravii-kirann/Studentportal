const jwt = require('jsonwebtoken');
const  errorHandler  = require('./error'); // Fix typo here

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; 
    console.log(token, "token"); 
    if (!token) return next(errorHandler(401, 'You are not authenticated'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        const newToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '30d' // Set the token to expire in 30 days
        });
        res.cookie('access_token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        next();
    });
}

module.exports = verifyToken;
