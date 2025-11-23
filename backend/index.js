import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
dotenv.config();
connectDB();
const app=express();
// Allow requests from the frontend and support credentials (cookies)
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended:true, limit: '10mb'}));
app.use('/api/auth',authRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/upload',uploadRoutes);
export default app;