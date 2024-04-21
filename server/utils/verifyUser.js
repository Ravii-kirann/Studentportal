const jwt = require('jsonwebtoken');
const errorHandler = require('./error'); // Fix typo here

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return next(errorHandler(401, 'You are not authenticated'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        const newToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '30d' // Set the token to expire in 30 days
        });
        res.setHeader('Authorization', `Bearer ${newToken}`);
        next();
    });
}

module.exports = verifyToken;
