import { likecomment } from "../../Models/LikeComment.js";
import { userprofile } from "../../Models/Profile.js";
import { comment } from "../../Models/Comment.js";

// Function to like comment 
export const commentLike = async (req, res) => {

    try {
        const commentData = await comment.findById(req.body.commentId)
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (commentData && userData) {
            const commentLike = await likecomment.find({ "commentId": req.body.commentId })

            if (commentLike.length === 0) {
                const CommentLike = {
                    userId: userData._id,
                    commentId: req.body.commentId
                }

                const commentlike = new likecomment(CommentLike)
                await commentlike.save().then().catch()

                const commentLikes = await likecomment.find({ "commentId": req.body.commentId })
                res.status(200).json({ "ArrayFromIf": commentLikes, "Length": (commentLikes.length).toString() })
            }
            else {
                const flag = await likecomment.find({ "commentId": req.body.commentId, userId: userData._id })

                if (flag.length > 0) {
                    await likecomment.findByIdAndDelete(flag[0]._id).then().catch()

                    const commentLikes = await likecomment.find({ "commentId": req.body.commentId })
                    res.status(200).json({ "ArrayFromElseIf": commentLikes, "Length": (commentLikes.length).toString() })
                }
                else {
                    const CommentLike = {
                        userId: userData._id,
                        commentId: req.body.commentId
                    }

                    const commentlike = new likecomment(CommentLike)
                    await commentlike.save().then().catch()

                    const commentLikes = await likecomment.find({ "commentId": req.body.commentId })
                    res.status(200).json({ "Length": (commentLikes.length).toString(), "DataFromElse": commentLikes })
                }
            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}