import { userprofile } from "../../Models/Profile.js";

// Functin to edit user info 
export const editUserInfo = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            await userprofile.findByIdAndUpdate(userData._id, { "userAbout": req.body.about }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.json({ "Message": err }))
        }
        else {
            res.status(204).json({ "Message": "Something Went Wromg!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
} 