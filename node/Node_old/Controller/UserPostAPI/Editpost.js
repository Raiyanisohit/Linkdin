import { posts } from "../../Models/Posts.js";

// Function to edit userPost
export const editUserPost = async (req, res) => {
    try {
        const postData = await posts.findById(req.body.postId)

        if (postData) {
            await posts.findByIdAndUpdate(req.body.postId, { "text": req.body.postText }, { new: true }).then((data) => res.status(200).send(data)).catch()
        }
        else {
            res.status(204).json({ Message: "Something Went Wrong!!" });
        }

    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });

    }
}