import Chat from "../models/Chat.js";

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