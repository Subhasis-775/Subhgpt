import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import Message from "../models/Message.js";
import { createMemory, queryMemory } from "../services/vectorService.js";
import aiService from "../services/aiService.js";

const initSocketServer=(httpServer)=>{
    // Add CORS configuration for Socket.io - Support multiple origins
    const allowedOrigins = [
        process.env.CLIENT_ORIGIN,
        'http://localhost:5173',
        'http://localhost:5174',
        'https://subhgpt.onrender.com'
    ].filter(Boolean);

    const io=new Server(httpServer,{
        cors: {
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    console.log('Socket.IO CORS blocked origin:', origin);
                    callback(null, true); // Allow all origins to prevent connection issues
                }
            },
            credentials: true
        }
    });
    
    io.use(async(socket,next)=>{
        try{
            // Get token from auth handshake
            const token = socket.handshake.auth.token;
            
            if(!token){
                return next(new Error("Authentication error: Token missing"));
            }
            
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decoded.id).select("-password");
            if(!user){
                return next(new Error("Authentication error: User not found"));
            }
            socket.user=user;
            console.log("Socket connection established ",user.email);
            next();
        }
        catch(error){
            console.error("socket auth error",error.message);
            next(new Error("Authentication error"));
        }
    })
    
    io.on("connection",(socket)=>{
        socket.on("ai-message",async(messagePayload)=>{
            try {
                console.log("Received message:", messagePayload);
                
                // Create user message and generate vector in parallel
                const [message, vectors] = await Promise.all([
                    Message.create({
                        chat: messagePayload.chat,
                        user: socket.user._id,
                        content: messagePayload.content,
                        role: "user"
                    }),
                    aiService.generateVector(messagePayload.content)
                ]);
                
                // Store user message in vector database
                await createMemory({
                    vectors,
                    messageId: message._id.toString(),
                    metadata: {
                        chat: messagePayload.chat,
                        user: socket.user._id.toString(),
                        text: messagePayload.content,
                        role: "user"
                    }
                });
                
                // Retrieve relevant memories and chat history in parallel
                const [memory, chatHistoryDocs] = await Promise.all([
                    queryMemory({
                        queryVector: vectors,
                        limit: 3,
                        metadata: {
                            user: socket.user._id.toString()
                        }
                    }),
                    Message.find({
                        chat: messagePayload.chat,
                    }).sort({createdAt: -1}).limit(20).lean()
                ]);
                
                // Reverse chat history (oldest first)
                const chatHistory = chatHistoryDocs.reverse();
                
                // Format chat history for AI
                const stm = chatHistory.map(item => ({
                    role: item.role,
                    parts: [{text: item.content}]
                }));
                
                // Format long-term memory
                const ltm = memory.length > 0 ? [
                    {
                        role: "user",
                        parts: [{
                            text: `These are some previous relevant messages from the chat. Use them for context:\n${memory.map(item => item.metadata.text).join('\n')}`
                        }]
                    }
                ] : [];
                
                // Combine memories and current conversation
                const conversationHistory = [...ltm, ...stm];
                
                // Generate AI response
                const response = await aiService.generateResponse(conversationHistory);
                
                // Emit response to client immediately
                socket.emit('ai-response', {
                    content: response,
                    chat: messagePayload.chat
                });
                
                // Store AI response and generate vector in parallel
                const [responseMessage, responseVectors] = await Promise.all([
                    Message.create({
                        chat: messagePayload.chat,
                        user: socket.user._id,
                        content: response,
                        role: "model"
                    }),
                    aiService.generateVector(response)
                ]);
                
                // Store AI response in vector database
                await createMemory({
                    vectors: responseVectors,
                    messageId: responseMessage._id.toString(),
                    metadata: {
                        chat: messagePayload.chat,
                        user: socket.user._id.toString(),
                        text: response,
                        role: "model"
                    }
                });
            } catch (error) {
                console.error("Error processing AI message:", error);
                socket.emit('ai-error', {
                    message: "Failed to process message",
                    error: error.message
                });
            }
        });
        
        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.user?.email);
        });
    });
}

export default initSocketServer;