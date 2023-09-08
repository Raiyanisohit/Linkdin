import mongoose, { Schema } from "mongoose";

const Like = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    postId: { type: Schema.Types.ObjectId, ref: 'post' },
    count: { type: Number }
},
    { timestamps: true }
);

export const like = mongoose.model('like', Like);