import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const createChat=async(req,res)=>{
    try {
        const {title}=req.body;
        const user=req.user;
        if(!title){
            return res.status(400).json({message:"please enter the title"}); 
        }
        const chat=await Chat.create({user:user._id,title});
        res.status(201).json({
            message:"chat created successfully",
            chat:{
                _id:chat._id,
                user:chat.user,
                title:chat.title,
                lastActivity:chat.lastActivity,
            }
        })
    } catch (error) {
        return res.status(500).json({message:"error in creating new chat"});
    }
}

export const getAllChats=async(req,res)=>{
    try {
        const user=req.user;
        const chats=await Chat.find({user:user._id}).sort({lastActivity:-1});
        res.status(200).json({
            message:"chats retrieved successfully",
            chats
        });
    } catch (error) {
        return res.status(500).json({message:"error in retrieving chats"});
    }
}

export const getChatById=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=req.user;
        const chat=await Chat.findOne({_id:id,user:user._id});
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }
        res.status(200).json({
            message:"chat retrieved successfully",
            chat
        });
    } catch (error) {
        return res.status(500).json({message:"error in retrieving chat"});
    }
}

export const deleteChat=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=req.user;
        const chat=await Chat.findOneAndDelete({_id:id,user:user._id});
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }
        // Also delete all messages in this chat
        await Message.deleteMany({chat:id});
        res.status(200).json({
            message:"chat deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({message:"error in deleting chat"});
    }
}

export const getChatMessages=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=req.user;
        const {limit=50,skip=0}=req.query;
        
        // Verify chat belongs to user
        const chat=await Chat.findOne({_id:id,user:user._id});
        if(!chat){
            return res.status(404).json({message:"chat not found"});
        }
        
        const messages=await Message.find({chat:id})
            .sort({createdAt:1})
            .skip(parseInt(skip))
            .limit(parseInt(limit));
            
        res.status(200).json({
            message:"messages retrieved successfully",
            messages
        });
    } catch (error) {
        return res.status(500).json({message:"error in retrieving messages"});
    }
}