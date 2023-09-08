import { likecomment } from "../../Models/LikeComment.js";
import { userprofile } from "../../Models/Profile.js";

// Function to check comment like
export const checkLikeComment = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const checkCommentLike = await likecomment.find({ "commentId": req.body.commentId, userId: userData._id })
        res.status(200).json({ "Message": checkCommentLike })
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to count the likes of each comment
export const countCommentLikes = async (req, res) => {
    try {
        const commentLikes = await likecomment.find({ "commentId": req.body.commentId })
        res.send((commentLikes.length).toString())
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}