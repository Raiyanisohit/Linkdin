import mongoose, { Schema } from "mongoose";

const Posts = mongoose.Schema({
    userName: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    text: { type: String },
    post: { type: Array }
},
    { timestamps: true }
);

export const posts = mongoose.model('post', Posts);