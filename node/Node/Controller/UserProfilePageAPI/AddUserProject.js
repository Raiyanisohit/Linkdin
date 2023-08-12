import { userprofile } from '../../Models/Profile.js';

export const addUserProject = async (req, res) => {

    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            if (req.body.projectEndYear === "") {
                const newUserProject = {
                    projectName: req.body.projectName,
                    description: req.body.description,
                    projectStartMonth: req.body.projectStartMonth,
                    projectStartYear: req.body.projectStartYear,
                    projectLink: req.body.projectLink,
                    projectEndMonth: "",
                    projectEndYear: 0
                }

                await userprofile.findByIdAndUpdate(userData._id, { $push: { "projects": newUserProject } }, { _id: true, new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
            else {

                const newUserProject = {
                    projectName: req.body.projectName,
                    description: req.body.description,
                    projectStartMonth: req.body.projectStartMonth,
                    projectStartYear: req.body.projectStartYear,
                    projectEndMonth: req.body.projectEndMonth,
                    projectEndYear: req.body.projectEndYear,
                    projectLink: req.body.projectLink
                }

                await userprofile.findByIdAndUpdate(userData._id, { $push: { "projects": newUserProject } }, { _id: true, new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
        }
        else {
            res.status(204).json({ "Message": "Something Went Wrong!!" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};