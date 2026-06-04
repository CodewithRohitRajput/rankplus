import mongoose from "mongoose";

export default async function mongodbServer(){
   const res = await mongoose.connect('mongodb://localhost:27017/rankplus')
    if(!res)console.log("Error connecting to mongodb")
    if(res)console.log("MongoDB Connected")
}

