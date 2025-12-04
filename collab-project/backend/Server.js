import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './routes/AuthRoutes.js';
import projectRoutes from './routes/ProjectRoutes.js';


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
app.use('/api', authRoutes)
app.use('/api/projects', projectRoutes);

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