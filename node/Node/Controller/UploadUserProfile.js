import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { userprofile } from "../Models/Profile.js";
import dotenv from 'dotenv'
dotenv.config();

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECREATE_ACCESS_KEY
    }
})

// Function to upload user profile
export const uploadUserProfile = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            const keys = Object.keys(req.files)

            keys.map(async (e) => {
                const command = new PutObjectCommand({
                    Bucket: "deepdemobucket",
                    Key: req.files[e].name,
                    Body: req.files[e].data,
                    ContentType: "image"
                })

                try {
                    // await client.send(command)
                    const url = `https://deepdemobucket.s3.ap-south-1.amazonaws.com/${req.files[e].name}`
                    await userprofile.findByIdAndUpdate(userData._id, { "userImage": url }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
                    // res.send(command)
                }
                catch (e) {
                    res.status(500).send(e)
                }
            })
        }
        else {
            res.status(500).send("Something Went Wrong!!")
        }
    } catch (error) {
        res.status(400).json({ "Messsage": "Something went Wrong", "Error": error });
    }
}

// Function to upload usersBackground photo
export const userBackgroundImage = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            const keys = Object.keys(req.files)

            keys.map(async (e) => {
                const command = new PutObjectCommand({
                    Bucket: "deepdemobucket",
                    Key: req.files[e].name,
                    Body: req.files[e].data,
                    ContentType: "image"
                })

                try {
                    // await client.send(command)
                    const url = `https://deepdemobucket.s3.ap-south-1.amazonaws.com/${req.files[e].name}`
                    await userprofile.findByIdAndUpdate(userData._id, { "backgroundImage": url }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
                catch (error) {
                    res.status(500).json({ "Message": error })
                }
            })
        }
        else {
            res.status(204).send("Something Went Wrong!!")
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}