import { userprofile } from "../../Models/Profile.js";

export const addPublication = async (req, res) => {

    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            // res.send(req.body)
            await userprofile.findByIdAndUpdate(userData._id, { $push: { "Publication": req.body } }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}