import { posts } from "../Models/Posts.js";
import { userprofile } from "../Models/Profile.js";

// Function to getAllPost data for users
export const getAllPost = async (req, res) => {
    try {
        const id = req.query.id
        if (id) {
            const postData = await posts.findOne({ "_id": id }).populate('userName', 'email firstName lastName userImage')
            res.status(200).send(postData)
        }
        else {
            const allPostData = await posts.find().populate('userName', 'email firstName lastName userImage')
            res.status(200).send(allPostData)
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to getLogInUserData post
export const logInUserPost = async (req, res) => {
    try {
        const id = req.query.id

        if (id) {
            const data = await posts.find({ "userName": id }).populate('userName', 'email firstName lastName userImage')
            res.status(200).json({ "Message": data })
        }
        else {
            const userId = await userprofile.findOne({ "email": req.body.email })
            const data = await posts.find({ "userName": userId._id }).populate('userName', 'email firstName lastName userImage')
            res.status(200).json({ "Message": data })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}