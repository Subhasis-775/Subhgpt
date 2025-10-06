import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { createChat } from '../controller/chatController.js';
const router=express.Router();
router.post('/',authMiddleware,createChat);
export default router;