import { comment } from "../../Models/Comment.js";
import { userprofile } from "../../Models/Profile.js";
import { posts } from "../../Models/Posts.js";

export const userComment = async (req, res) => {

    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {

            const postData = await posts.findById(req.body.postId)

            const Comment = {
                postId: postData._id,
                userId: userData._id,
                text: req.body.comment
            }

            const postComment = new comment(Comment)
            await postComment.save().then((data) => res.status(200).json({ "Message": "Comment Added!!", "Data": data })).catch((err) => res.json({ "Message": err }))
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}