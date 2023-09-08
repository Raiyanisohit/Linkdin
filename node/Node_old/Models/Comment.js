import mongoose, { Schema } from "mongoose";

const Comment = mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'post' },
    userId: { type: Schema.Types.ObjectId, ref: 'userprofile' },
    text: { type: String, required: true }
},
    { timestamps: true }
);

export const comment = mongoose.model('comment', Comment);