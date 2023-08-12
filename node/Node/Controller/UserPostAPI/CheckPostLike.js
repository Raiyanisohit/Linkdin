import { like } from '../../Models/Likes.js';

// Function to calculate postLikes
export const postLikeCalculate = async (req, res) => {
    try {
        const postLikes = await like.find({ "postId": req.body.postId })
        res.status(200).send((postLikes.length).toString())
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
} 