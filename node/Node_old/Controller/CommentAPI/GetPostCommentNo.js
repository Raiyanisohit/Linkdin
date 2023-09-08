import { comment } from "../../Models/Comment.js";
import { userprofile } from "../../Models/Profile.js";

// Function to get the numbers of comment for each post
export const getPostCommentNo = async (req, res) => {
    try {
        const postComment = await comment.find({ "postId": req.body.postId })
        res.status(200).send((postComment.length).toString())
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to get the total comments of clicked post 
export const getPostComments = async (req, res) => {
    try {
        const postComment = await comment.find({ "postId": req.body.postId }).populate('userId', 'firstName lastName userImage -_id')
        res.status(200).json({ "Data": postComment })
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// function to get the comments of logedin user or search user
export const getUsersComments = async (req, res) => {
    try {
        const id = req.query.id
        if (id) {
            const commentData = await comment.find({ "userId": id }).populate('userId', 'firstName lastName -_id')
            res.status(200).json({ "Message": commentData })
        }
        else {
            const userData = await userprofile.findOne({ "email": req.body.email })

            const commentData = await comment.find({ "userId": userData._id }).populate('userId', 'firstName lastName -_id')
            res.status(200).json({ "Message": commentData })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}