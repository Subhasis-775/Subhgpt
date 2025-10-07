import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from "../models/User.js";
import generateResponse from "../services/aiService.js";
import Message from "../models/Message.js";
import { createMemory, queryMemory } from "../services/vectorService.js";
import aiService from "../services/aiService.js";
const initSocketServer=(httpServer)=>{
    const io=new Server(httpServer,{});
        io.use(async(socket,next)=>{
            try{
            const cookies=cookie.parse(socket.handshake.headers.cookie || "");
            const token=cookies.token;
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
            console.log(messagePayload);
            const message=await Message.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:messagePayload.content,
                role:"user"
        })

        const vectors=await aiService.generateVector(messagePayload.content)
        await createMemory({
            vectors,
            messageId:message._id,
            metadata:{
                chat:messagePayload.chat,
                user:socket.user._id
            }
        })

        const chatHistory=(await Message.find({
            chat:messagePayload.chat,
        }).sort({createdAt:-1}).limit(20).lean()).reverse();
        console.log(chatHistory);
            const response=await generateResponse(chatHistory.map(item=>{
            return{
            role:item.role,
            parts:[{text:item.content}]
            }
        }));
            const responseMessage=await Message.create({
                chat:messagePayload.chat,
                user:socket.user._id,
                content:response,
                role:"model"
            })
            const responseVectors=await aiService.generateVector(response);
            await createMemory({
                vectors:responseVectors,
                messageId:responseMessage._id,
                metadata:{
                    chat:messagePayload.chat,
                    user:socket.user._id,
                }
            })
            const memory=await queryMemory({
                    queryVector:vectors,
                    limit:3,
                    metadata:{}
                })
            socket.emit('ai-response',{
                content:response,
                chat:messagePayload.chat
            })
        })
    })
}
export default initSocketServer;