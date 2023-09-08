import { like } from '../../Models/Likes.js';
import { userprofile } from '../../Models/Profile.js';

export const checkUserPostLike = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })
        const postData = await like.find({ "postId": req.body.postId, userId: userData._id })

        if (postData) {
            res.status(200).json({ "Message": postData })
        }
        else {
            res.status(200).json({ "Message": "Not liked yet" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}