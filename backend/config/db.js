import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connencted");
    } catch (error) {
        console.error("error in connecting mongodb");
        process.exit(1);
    }
}
export default connectDB;