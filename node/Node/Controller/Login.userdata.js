import { userprofile } from "../Models/Profile.js"

export const userProfile = async (req, res) => {

    const id = req.query.id

    try {
        if (id) {
            const userData = await userprofile.findById(id)
            res.status(200).json({ "Message": userData })
        }
        else {
            const userData = await userprofile.findOne({ "email": req.body.email })
            res.status(200).json({ "Message": userData })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}