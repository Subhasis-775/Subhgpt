import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

// Connect DB once
connectDB();

const app = express();

// CORS - Support multiple origins
const allowedOrigins = [
    process.env.CLIENT_ORIGIN,
    'http://localhost:5173',
    'http://localhost:5174',
    'https://subhgpt.onrender.com'
].filter(Boolean); // Remove undefined values

app.use(cors({ 
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(null, true); // Allow all origins in production to prevent issues
        }
    },
    credentials: true 
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoutes);

export default app;
