import mongoose from "mongoose";

const OTP = mongoose.Schema({
    email: { type: String },
    OTP: { type: String }
},
    { timestamps: true }
)

export const otp = mongoose.model("otp", OTP)