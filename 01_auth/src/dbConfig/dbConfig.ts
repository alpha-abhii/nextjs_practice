import mongoose from "mongoose";
import { DB_NAME } from "@/constant/constants";

export async function connect(){
    try {
        mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB Connected");
        });
        connection.on('error',(err)=>{
            console.log("MongoDB connection error, please make sure db is up and running"+err);
            process.exit(1);
        })
    } catch (error) {
        console.log("Error while connection to MongoDB!!!",error);
    }
}