import { userprofile } from "../../Models/Profile.js";

export const addUserEducation = async (req, res) => {

    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            const newEducation = {
                instituteName: req.body.instituteName,
                degree: req.body.degree,
                studyField: req.body.studyField,
                startYear: req.body.startYear,
                startMonth: req.body.startMonth,
                descprition: req.body.descprition,
                endYear: req.body.endYear,
                endMonth: req.body.endMonth,
                grade: req.body.grade
            }

            await userprofile.findByIdAndUpdate(userData._id, { $push: { "education": newEducation } }, { _id: true, new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
        }
        else {
            res.status(500).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}