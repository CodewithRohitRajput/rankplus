import User from "../models/User.js";
import Submission from "../models/Submission.js";
import type { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export async function profile (req : Request, res: Response){
    const {id} = req.params
    const token = req.cookies.token
    const decoded = jwt.verify(token, process.env.SECRET as string) as {id : string}
    const userId = decoded.id
    
    const userProfile = await User.findById({_id : userId})
    const userMock = await Submission.find({userId})

    return res.status(200).json({userProfile, userMock})
} 

export default {
    profile
}