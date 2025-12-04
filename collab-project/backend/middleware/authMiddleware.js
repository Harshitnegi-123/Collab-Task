import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get the token part
            const rawToken = req.headers.authorization.split(' ')[1];

            // 2. CLEAN THE TOKEN (The Fix)
            // This removes any quotation marks (" or ') and trims whitespace/newlines
            token = rawToken.replace(/['"]+/g, '').trim();

            console.log("Cleaning Token...");
            console.log("Original:", rawToken);
            console.log("Cleaned :", token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying the token...

            //Find the user
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            next();
        } catch (error) {
            console.error("Auth Error:", error.message);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

export { protect };