import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },

    answers: [Number],

    score: Number,

    totalQuestions: Number
},
{
    timestamps: true
});

export default mongoose.model("Submission", submissionSchema);