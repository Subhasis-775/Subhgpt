# 🤖 SubhGPT - AI-Powered Chat Application

<div align="center">

![SubhGPT Banner](https://img.shields.io/badge/SubhGPT-AI%20Chat-10A37F?style=for-the-badge&logo=openai&logoColor=white)

**A production-ready ChatGPT clone built with the MERN stack, featuring real-time messaging, AI integration, and semantic search capabilities.**

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white)](https://socket.io/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Architecture](#-architecture) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Key Highlights](#-key-highlights)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**SubhGPT** is a full-stack AI chat application that replicates the core functionality of ChatGPT. It features real-time messaging, intelligent AI responses powered by Google Gemini, semantic search using vector embeddings, and a modern, responsive UI with dark/light mode support.

This project demonstrates advanced full-stack development skills including WebSocket implementation, AI API integration, vector database usage, and production-ready UI/UX design.

---

## ✨ Features

### 🎯 Core Features
- **Real-time Messaging** - Instant communication using Socket.io WebSockets
- **AI-Powered Responses** - Integration with Google Gemini AI for intelligent conversations
- **Semantic Search** - Vector embeddings with Pinecone for context-aware responses
- **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- **Chat Management** - Create, view, and delete multiple chat conversations
- **File Upload** - Support for PDF, DOCX, and TXT file uploads with text extraction

### 🎨 UI/UX Features
- **Modern ChatGPT-like Interface** - Clean, intuitive design
- **Dark/Light Mode** - Complete theming system with smooth transitions
- **Toast Notifications** - Real-time feedback for user actions
- **Responsive Design** - Mobile-first approach, works on all devices
- **Loading States** - Smooth animations and loading indicators
- **Markdown Support** - Rich text formatting in messages
- **Code Syntax Highlighting** - Beautiful code blocks with syntax highlighting
- **Auto-scrolling** - Automatic scroll to latest messages

### 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Secure WebSocket connections

---

## 🎬 Demo

### Screenshots

#### Light Mode
![Light Mode Chat]<img width="1900" height="856" alt="image" src="https://github.com/user-attachments/assets/91ecc2e2-9000-4d61-b332-c9cd4a1212f3" />



#### Dark Mode
![Dark Mode Chat]<img width="1905" height="871" alt="image" src="https://github.com/user-attachments/assets/48fb4aed-d973-48f2-8462-68bc9c4e8b21" />


#### Authentication
![Login Page]<img width="800" height="867" alt="image" src="https://github.com/user-attachments/assets/71acd34c-c935-4e1a-a447-e571d90d3b97" />


### Live Demo
🔗 [Live Demo Link]  https://subhgpt.vercel.app/

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting
- **CSS3** - Styling with CSS variables

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - WebSocket server
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction
- **Mammoth** - DOCX text extraction

### AI & Vector Database
- **Google Gemini AI** - AI response generation
- **Pinecone** - Vector database for semantic search

### Development Tools
- **Nodemon** - Auto-restart server
- **Vite** - Frontend build tool
- **ESLint** - Code linting

---

## 🏗 Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Client   │◄───────►│  Express Server │◄───────►│    MongoDB      │
│  (Frontend)     │         │   (Backend)     │         │   (Database)    │
│                 │         │                 │         │                 │
└────────┬────────┘         └────────┬────────┘         └─────────────────┘
         │                           │
         │ Socket.io                 │
         │ WebSocket                 │
         │                           │
         │                  ┌────────▼────────┐
         └─────────────────►│  Socket.io      │
                            │  Server         │
                            └────────┬────────┘
                                     │
                        ┌────────────┼────────────┐
                        │                         │
                 ┌──────▼──────┐          ┌──────▼──────┐
                 │   Gemini    │          │  Pinecone   │
                 │     AI      │          │   Vector    │
                 │             │          │     DB      │
                 └─────────────┘          └─────────────┘
```

### Data Flow
1. **User Authentication** - JWT tokens stored in localStorage
2. **Chat Creation** - REST API creates chat in MongoDB
3. **Message Sending** - WebSocket emits message to server
4. **AI Processing** - Server queries Gemini AI and Pinecone for context
5. **Response Delivery** - WebSocket emits AI response back to client
6. **Vector Storage** - Messages stored as embeddings in Pinecone

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key
- Pinecone API Key

### Clone Repository
```bash
git clone https://github.com/Subhasis-775/Subhgpt.git
cd subhgpt
```

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
CLIENT_ORIGIN=http://localhost:5173
PORT=5000
```

Start backend server:
```bash
npm start
# or for development
nodemon server.js
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: `https://subhgpt.vercel.app/`
- Backend: `https://subhgpt.onrender.com`

---

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://localhost:27017/chatgpt` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `PINECONE_API_KEY` | Pinecone API key | `pcsk_...` |
| `CLIENT_ORIGIN` | Frontend URL for CORS | `http://localhost:5173` |
| `PORT` | Backend server port | `5000` |

### Frontend
No environment variables required. API URL is configured in code as `https://subhgpt.onrender.com`.

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user": {
    "_id": "...",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Chat Endpoints

#### Create Chat
```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Chat"
}
```

#### Get All Chats
```http
GET /api/chat
Authorization: Bearer <token>
```

#### Get Chat by ID
```http
GET /api/chat/:chatId
Authorization: Bearer <token>
```

#### Delete Chat
```http
DELETE /api/chat/:chatId
Authorization: Bearer <token>
```

#### Get Chat Messages
```http
GET /api/chat/:chatId/messages
Authorization: Bearer <token>
```

### File Upload Endpoint

#### Upload File
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <PDF/DOCX/TXT file>
```

**Response:**
```json
{
  "message": "File processed successfully",
  "text": "Extracted text content...",
  "filename": "document.pdf"
}
```

### WebSocket Events

#### Client → Server

**Send Message:**
```javascript
socket.emit('ai-message', {
  chat: 'chatId',
  content: 'User message'
});
```

#### Server → Client

**AI Response:**
```javascript
socket.on('ai-response', (data) => {
  // data: { content: 'AI response', chat: 'chatId' }
});
```

**Error:**
```javascript
socket.on('ai-error', (error) => {
  // error: { message: 'Error message' }
});
```

---

## 📁 Project Structure

```
subhgpt/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controller/
│   │   ├── authController.js     # Authentication logic
│   │   ├── chatController.js     # Chat management
│   │   └── uploadController.js   # File upload handling
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Chat.js               # Chat schema
│   │   └── Message.js            # Message schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── chatRoutes.js         # Chat endpoints
│   │   └── uploadRoutes.js       # Upload endpoints
│   ├── services/
│   │   ├── aiService.js          # Gemini AI integration
│   │   └── vectorService.js      # Pinecone integration
│   ├── socket/
│   │   └── socketServer.js       # Socket.io server
│   ├── .env                      # Environment variables
│   ├── index.js                  # Express app setup
│   ├── server.js                 # Server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.jsx    # Route protection
│   │   │   └── ThemeToggle.jsx       # Theme switcher
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Auth state management
│   │   │   └── ToastContext.jsx      # Toast notifications
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Register.jsx          # Registration page
│   │   │   └── Chat.jsx              # Main chat interface
│   │   ├── styles/
│   │   │   ├── variables.css         # CSS variables
│   │   │   ├── index.css             # Global styles
│   │   │   ├── auth.css              # Auth page styles
│   │   │   ├── chat.css              # Chat page styles
│   │   │   ├── toast.css             # Toast styles
│   │   │   └── theme-toggle.css      # Theme toggle styles
│   │   ├── App.jsx                   # Main app component
│   │   ├── Approutes.jsx             # Route configuration
│   │   └── main.jsx                  # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🎯 Key Highlights

### 1. **Real-time Communication**
- Implemented WebSocket server with Socket.io
- Bidirectional event-based communication
- Automatic reconnection handling
- Connection state management

### 2. **AI Integration**
- Google Gemini AI for intelligent responses
- Context-aware conversations
- Streaming responses (can be implemented)
- Custom AI persona configuration

### 3. **Vector Database**
- Pinecone for semantic search
- Vector embeddings for messages
- Long-term memory storage
- Context retrieval for relevant responses

### 4. **Security**
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with middleware
- CORS configuration
- Secure WebSocket connections

### 5. **File Processing**
- PDF text extraction with pdf-parse
- DOCX text extraction with mammoth
- Plain text file support
- File validation and error handling

### 6. **Modern UI/UX**
- ChatGPT-inspired design
- Smooth animations and transitions
- Responsive layout (mobile-first)
- Accessibility features
- Custom scrollbars
- Loading skeletons

---

## 🚀 Future Enhancements

- [ ] **Message Editing** - Edit and delete sent messages
- [ ] **Chat Export** - Export conversations as PDF/TXT
- [ ] **Voice Input** - Speech-to-text integration
- [ ] **Image Generation** - DALL-E integration
- [ ] **Code Execution** - Run code snippets in sandbox
- [ ] **Collaborative Chats** - Multiple users in one chat
- [ ] **Chat Sharing** - Share conversations via link
- [ ] **Message Reactions** - React to messages with emojis
- [ ] **Search Functionality** - Search within chats
- [ ] **User Settings** - Customize AI behavior and preferences
- [ ] **Rate Limiting** - Prevent API abuse
- [ ] **Caching** - Redis for improved performance
- [ ] **Deployment** - Docker containerization
- [ ] **CI/CD** - Automated testing and deployment
- [ ] **Analytics** - Usage statistics and insights

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Subhasis Rout**
- GitHub: https://github.com/Subhasis-775
- LinkedIn: https://www.linkedin.com/in/subhasis-rout-3b22892a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app
- Email: subhasisrout00@gmail.com

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for ChatGPT inspiration
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Pinecone](https://www.pinecone.io/) for vector database
- [Socket.io](https://socket.io/) for real-time communication
- [MongoDB](https://www.mongodb.com/) for database
- [React](https://reactjs.org/) for UI framework

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/subhgpt?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/subhgpt?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/subhgpt)
![GitHub license](https://img.shields.io/github/license/yourusername/subhgpt)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Subhasis](https://github.com/Subhasis-775)

</div>
