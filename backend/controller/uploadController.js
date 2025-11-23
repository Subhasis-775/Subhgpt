import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.txt', '.docx', '.doc'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, TXT, and DOCX files are allowed.'));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Extract text from PDF
async function extractTextFromPDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

// Extract text from DOCX
async function extractTextFromDOCX(filePath) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
}

// Extract text from TXT
function extractTextFromTXT(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        let extractedText = '';

        try {
            switch (ext) {
                case '.pdf':
                    extractedText = await extractTextFromPDF(filePath);
                    break;
                case '.docx':
                case '.doc':
                    extractedText = await extractTextFromDOCX(filePath);
                    break;
                case '.txt':
                    extractedText = extractTextFromTXT(filePath);
                    break;
                default:
                    return res.status(400).json({ message: 'Unsupported file type' });
            }

            // Delete the file after extraction
            fs.unlinkSync(filePath);

            res.status(200).json({
                message: 'File processed successfully',
                text: extractedText,
                filename: req.file.originalname
            });
        } catch (parseError) {
            // Delete file if parsing fails
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            throw parseError;
        }
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ 
            message: 'Error processing file',
            error: error.message 
        });
    }
};
