import express from 'express';
import { createQuiz, getAllQuiz, getOneQuiz } from '../controllers/quiz.js';

const router = express.Router();

// POST /api/quiz/example
router.post('/create', createQuiz);
router.get('/getall', getAllQuiz);
router.get('/getone/:id', getOneQuiz);

export default router;

