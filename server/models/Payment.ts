import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },

    amount: Number,

    razorpayOrderId: String,

    razorpayPaymentId: String,

    status: String
},
{
    timestamps: true
});

export default  mongoose.model("Payment", paymentSchema);