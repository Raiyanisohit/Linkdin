import { posts } from "../../Models/Posts.js";
import { like } from "../../Models/Likes.js";
import { comment } from "../../Models/Comment.js";
import { likecomment } from "../../Models/LikeComment.js";

// Function to delete user post
export const deleteUserPost = async (req, res) => {

    try {
        const postData = await posts.findById(req.body.postId)

        if (postData) {
            const commentData = await comment.find({ "postId": req.body.postId })
            commentData.forEach(async (e) => {
                await likecomment.deleteMany({ "commentId": e._id })
            })
            await posts.findByIdAndDelete(req.body.postId).then().catch()
            await like.deleteMany({ "postId": req.body.postId }).then().catch()
            await comment.deleteMany({ "postId": req.body.postId }).then(() => res.status(200).json({ "Message": "Deleted Successfully" })).catch()
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
} 