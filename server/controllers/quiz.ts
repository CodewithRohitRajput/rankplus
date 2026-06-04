import type { Request, Response } from 'express';
import Quiz from '../models/Quiz.js';

export  async function createQuiz(req: Request, res: Response) {
        const data = req.body;
        const newQuiz = await Quiz.create(data);
        return res.status(201).json({ message: `${newQuiz.title} created successfully`});
    
}

export async function getAllQuiz(req: Request, res: Response){
    const data = await Quiz.find();
    return res.status(200).json(data);
}

export async function getOneQuiz(req: Request, res: Response){
    const {id} = req.params
    const data = await Quiz.findById(id)
    if(!data) return res.status(404).json({message : "This mock test has been deleted. Please refresh the page"})
    return res.status(200).json(data)
}

export default {
    createQuiz,
    getAllQuiz,
    getOneQuiz
};