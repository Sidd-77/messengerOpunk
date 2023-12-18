import mongoose from "mongoose";
import 'dotenv/config';

const url:any = process.env.MONGO_URI;

const connectDB = async()=>{
    const connection = await mongoose.connect(url)
        .then(()=>{
            console.log("Connected");
        })
        .catch((err)=>{
            console.log(err);
        })
}

export default connectDB;
