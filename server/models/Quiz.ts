import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema({
    title : String,
    subject : String,
    exam: String,
    description : String,
    isPaid : Boolean,
    price : Number,
    duration : Number,
    questions : [
        {
            question: String,
            options : [String],
            correctAnswer : Number
        }
    ]
},{timestamps : true})

export default mongoose.model("Quiz", quizSchema)