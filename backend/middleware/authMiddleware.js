import User from "../models/User.js";
import jwt from 'jsonwebtoken';
const authMiddleware=async(req,res,next)=>{
    try{
    const authHeader=req.header("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Access denied"});
    }
    const token=authHeader.replace("Bearer ","").trim();
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id).select("-password");
    next();
}
catch(error){
    return res.status(401).json({message:"Invalid token"});
}
}
export default authMiddleware;