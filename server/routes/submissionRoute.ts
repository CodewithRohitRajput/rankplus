import express from 'express'
import { submitMock } from '../controllers/submission.js'

const router = express.Router()


router.post('/submit', submitMock)


export default router