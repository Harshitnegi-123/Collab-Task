import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import User from './models/User.js'; 

// Set up the Express app
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.DATABASE_URL;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.get('/', (req, res) => {
    res.send('Hello! This is the backend speaking.');
});

app.post('/api/register', async (req, res) => { 
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please provide all the necessary fields." })
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "Hurray! User created successfully." }); 

    } catch (error) {
        console.error("Oops!! looks like an error occurred.", error);
       
        res.status(500).json({ error: "Server error, please try again later !" });
    }
});

app.post('/api/login', async (req, res) => { 
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Something seems invalid here, check it again !" });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const payload = {
            id: user._id,
            username: user.username,
        };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ error: "Server error, please try again" }); // Use 500 for server errors
    }
})


// --- Connect to MongoDB and Start Server ---
if (!MONGODB_URI) {
    console.error("Error: DATABASE_URL is not defined in .env file");
    process.exit(1);
}

console.log("Connecting to MongoDB...");
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Backend server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });