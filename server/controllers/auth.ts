import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import type { Request, Response } from 'express';

dotenv.config()

const SECRET=process.env.SECRET
if(!SECRET){
    throw new Error("Secret key is missing from the env file.")
}

export  async function signup (req : Request,res: Response){
    const {username, email, password} = req.body;
    const isNew = await User.findOne({email});
    if(isNew) return res.status(400).json({message : "User already exists"})
    const hashPass = await bcrypt.hash(password,10);
    const newUser = await User.create({username,email,password:hashPass})
    const token = jwt.sign(
        {id : newUser._id,},
        SECRET as string
       )

       res.cookie("token", token,{
        httpOnly:true
       })
    
       res.status(201).json({message: "Signup Successful."})

}


export async function login (req: Request, res: Response){
    const {email,password} = req.body;
    const isUser = await User.findOne({email})
    if(!isUser) return res.status(404).json({message : " User not found" })
    if(typeof isUser.password !== 'string' || !isUser.password){
        return res.status(500).json({message : "Password is missing for this account"})
    }
    const passCheck = await bcrypt.compare(password, isUser.password)
    if(!passCheck) return res.status(400).json({message : "Password is incorrect"})
    
        const token = jwt.sign({id : isUser._id}, SECRET as string)
        res.cookie("token",token,{
            httpOnly: true
        })
        res.status(200).json({message : "LoggedIn Successful"})
}









export default {
    login,
    signup
}