import { posts } from "../../Models/Posts.js";
import { userprofile } from "../../Models/Profile.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
dotenv.config();

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECREATE_ACCESS_KEY
    }
});

// Function to craete a userPost
export const createUserPost = async (req, res) => {

    try {
        // console.log(req.files)
        const userData = await userprofile.findOne({ "email": req.body.email })
        if (userData) {
            if (req.files) {
                let data = req.files.photo;

                if (data.length === undefined) {
                    data = [data]
                }

                const postLink = [];

                const keys = Object.keys(data)

                keys.forEach(async (e) => {
                    const key = data[e].name
                    const body = data[e].data

                    const command = new PutObjectCommand({
                        Bucket: "deepdemobucket",
                        Key: key,
                        Body: body,
                        ContentType: "image"
                    });

                    // console.log(command)

                    try {
                        client.send(command);
                        const url = `https://deepdemobucket.s3.ap-south-1.amazonaws.com/${key}`;
                        postLink.push(url)

                    } catch (err) {
                        res.status(500).json({ Messsage: "Something went Wrong", Error: err });
                    }
                })

                // console.log(req.body.postText)
                const userPost = {
                    userName: userData._id,
                    text: req.body.postText,
                    post: postLink
                }

                const newUserPost = new posts(userPost)
                await newUserPost.save().then((data) => res.status(200).json({ "Message": "Post Successfully Added", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
            else {
                const userPost = {
                    userName: userData._id,
                    text: req.body.postText
                }

                const newUserPost = new posts(userPost)
                await newUserPost.save().then((data) => res.status(200).json({ "Message": "Post Successfully Added", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}