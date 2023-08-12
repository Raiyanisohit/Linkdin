import { posts } from "../../Models/Posts.js";
import { like } from "../../Models/Likes.js";
import { userprofile } from "../../Models/Profile.js";
import mongoose from "mongoose";

// {"postId":new ObjectId('6496ce9414e3cfc116681b96')}

// Function to postLike
export const postLike = async (req, res) => {

    try {
        const postData = await posts.findById(req.body.postId)
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (postData) {
            const postLikes = await like.find({ "postId": req.body.postId })

            if (postLikes.length === 0) {
                const Like = {
                    userId: userData._id,
                    postId: req.body.postId
                }

                const likePost = new like(Like)
                await likePost.save().then().catch()

                const likes = await like.find({ "postId": req.body.postId })
                res.status(200).json({ "Length": (likes.length).toString(), "ArrayFromFirstIf": likes })
            }

            else {
                const flag = await like.find({ "postId": new mongoose.Types.ObjectId(req.body.postId), userId: userData._id })

                if (flag.length > 0) {
                    await like.findByIdAndDelete(flag[0]._id).then().catch()

                    const postLikes = await like.find({ "postId": req.body.postId })
                    res.status(200).json({ "Length": (postLikes.length).toString(), "ArrayFromElseIf": postLikes })

                }
                else {
                    const Like = {
                        userId: userData._id,
                        postId: req.body.postId
                    }

                    const likePost = new like(Like)
                    await likePost.save().then().catch()
                    const postLikes = await like.find({ "postId": req.body.postId })
                    res.status(200).json({ "Length": (postLikes.length).toString(), "ArrayFromElse": postLikes })
                }
            }
        }
        else {
            res.json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}