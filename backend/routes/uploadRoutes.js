import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload, uploadFile } from '../controller/uploadController.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('file'), uploadFile);

export default router;
