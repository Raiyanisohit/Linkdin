import mongoose from "mongoose";

const forgotPasswordOTP = mongoose.Schema({
    email: { type: String },
    OTP: { type: String }
},
    { timestamps: true }
)

export const forgetpasswordotp = mongoose.model('forgototp', forgotPasswordOTP)