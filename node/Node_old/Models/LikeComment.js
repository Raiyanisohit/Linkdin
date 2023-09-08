import mongoose, { Schema } from "mongoose";

const LikeComment = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, 'ref': 'userprofile' },
    commentId: { type: Schema.Types.ObjectId, 'ref': 'comment' }
},
    { timestamps: true }
)

export const likecomment = mongoose.model('commentlike', LikeComment)