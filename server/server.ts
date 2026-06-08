import express from 'express'
import cookieParser from 'cookie-parser';
import quizRoute from './routes/quizRoute.js';
import mongodbServer from './config/db.js';
import submitRoute from './routes/submissionRoute.js'
import auth from './routes/authRoute.js'
import profile from './routes/profileRoute.js'

import cors from 'cors'
const port = 8000;
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))
mongodbServer()
// API routes
app.use('/api/quiz', quizRoute);
app.use('/api/mock', submitRoute)
app.use('/api/auth', auth)
app.use('/api/profile', profile)

app.get('/', (req, res)=>{
    res.send("Hey man!")
})


app.listen(port,()=>{
    console.log("server is running bitch!")
})