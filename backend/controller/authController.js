import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const signup=async(req,res)=>{
    try {
        const {fullName:{firstName,lastName},email,password}=req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"please fill the required fields"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }
        const hashedPass=await bcrypt.hash(password,10);
        const newUser=await User.create({fullName:{firstName,lastName},email,password:hashedPass});
        res.status(201).json({message:`new User registered welcoem ${firstName}`,
        user:{
            name:firstName,
            email:email,
            id:newUser._id
        }
        });
    } catch (error) {
        console.error("error in signup");
        return res.status(500).json({message:error.message});
    }
}
// Login
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password) return res.status(400).json({message:"please fill the required fields"});
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({message:"user not found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({
            message:"login successful",
            token,user:{
                id:user._id,
                name:user.fullName.firstName,
                email:user.email,
            }
        })
    } catch (error) {
        return res.status(500).json({message:`error in login ${error.message}`});
    }
}