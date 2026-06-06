import Submission from "../models/Submission.js";
import Quiz from "../models/Quiz.js";
import type { Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export async function submitMock(req: Request, res: Response){
    const {mockId, answers} = req.body;
    const mock = await Quiz.findById({_id: mockId})
    if(!mock){
        return res.status(404).json({message : "Mock not found"})
    }
    let score = 0;
    mock.questions.map((que,idx)=>{
        if(que.correctAnswer === answers[idx]) {
            score++;
        }
    })

    const token = req.cookies.token
    if(!token) return res.status(404).json({message :"pls login first"})
    const decoded = jwt.verify(token, process.env.SECRET as string) as {id : string}
    const userId = (decoded.id as string)
    const submitMock = await Submission.create({
        userId,
        mockId,
        answers,
        score,
        totalQuestions : mock.questions.length
    })

    if(submitMock){
        return res.status(200).json({message : "Mock Test Submitted Successfully"})
    }

}

export default {
    submitMock
}