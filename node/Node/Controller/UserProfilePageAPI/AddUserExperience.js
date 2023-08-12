import { userprofile } from "../../Models/Profile.js";

export const addUserExperience = async (req, res) => {

    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            if (!req.body.endYear) {
                if (req.body.profileHeadline === "") {
                    const newExperience = {
                        companyName: req.body.companyName,
                        employementType: req.body.employementType,
                        jobTitle: req.body.jobTitle,
                        location: req.body.location,
                        locationType: req.body.locationType,
                        startYear: req.body.startYear,
                        startMonth: req.body.startMonth,
                        endMonth: "",
                        endYear: 0
                    }

                    await userprofile.findByIdAndUpdate(userData._id, { $push: { "experience": newExperience } }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
                else {
                    const newExperience = {
                        companyName: req.body.companyName,
                        employementType: req.body.employementType,
                        jobTitle: req.body.jobTitle,
                        location: req.body.location,
                        locationType: req.body.locationType,
                        startYear: req.body.startYear,
                        startMonth: req.body.startMonth,
                        endMonth: "",
                        endYear: 0
                    }

                    await userprofile.findByIdAndUpdate(userData._id, { "profileHeadline": req.body.profileHeadline }).then().catch()

                    await userprofile.findByIdAndUpdate(userData._id, { $push: { "experience": newExperience } }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
            }
            else {
                const newExperience = {
                    companyName: req.body.companyName,
                    employementType: req.body.employementType,
                    jobTitle: req.body.jobTitle,
                    location: req.body.location,
                    locationType: req.body.locationType,
                    startYear: req.body.startYear,
                    startMonth: req.body.startMonth,
                    endMonth: req.body.endMonth,
                    endYear: req.body.endYear
                }

                await userprofile.findByIdAndUpdate(userData._id, { $push: { "experience": newExperience } }, { _id: true, new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}