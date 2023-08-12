import mongoose from 'mongoose';

// UserSignUp model
const Signup = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
},
    { timestamps: true }
);

export const signup = mongoose.model('signupuser', Signup);
