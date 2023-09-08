import { userprofile } from '../../Models/Profile.js';
import { validateProject } from '../../Validation/Validate.Userproject.js';
import { userProject } from '../../Models/UserProject.js';

// Function to add user project
export const addUserProject = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidateData = await validateProject(req.body.projectName, req.body.projectStartMonth, req.body.projectStartYear);

            if (ValidateData.error) {
                res.status(400).json({ "Message": ValidateData.error.details[0].message });
            }
            else {

                if (req.body.projectEndYear === "") {
                    const newUserProject = {
                        userId: userData._id,
                        projectName: req.body.projectName,
                        description: req.body.description,
                        projectStartMonth: req.body.projectStartMonth,
                        projectStartYear: req.body.projectStartYear,
                        projectLink: req.body.projectLink,
                        projectEndMonth: "",
                        projectEndYear: 0
                    };

                    const newProject = await new userProject(newUserProject);

                    await newProject.save().then((data) => res.status(200).json({ "Message": "Project Added..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
                }
                else {
                    const newUserProject = {
                        userId: userData._id,
                        projectName: req.body.projectName,
                        description: req.body.description,
                        projectStartMonth: req.body.projectStartMonth,
                        projectStartYear: req.body.projectStartYear,
                        projectEndMonth: req.body.projectEndMonth,
                        projectEndYear: req.body.projectEndYear,
                        projectLink: req.body.projectLink
                    };

                    const newProject = await new userProject(newUserProject);

                    await newProject.save().then((data) => res.status(200).json({ "Message": "Project Added..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
                }
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to get user project
export const getUserProject = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });
        const id = req.query.id;

        if (userData) {
            if (id) {
                const projectData = await userProject.find({ "userId": id });
                res.status(200).json({ "Message": projectData });
            }
            else {
                const projectData = await userProject.find({ "userId": userData._id });
                res.status(200).json({ "Message": projectData });
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to edit user project
export const editUserProject = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidateData = await validateProject(req.body.projectName, req.body.projectStartMonth, req.body.projectStartYear);

            if (ValidateData.error) {
                res.status(400).json({ "Message": ValidateData.error.details[0].message });
            }
            else {
                if (req.body.projectEndYear === "def" && req.body.projectEndMonth === "def") {
                    await userProject.findByIdAndUpdate(req.body.id,
                        {
                            "projectName": req.body.projectName,
                            "description": req.body.description,
                            "projectStartMonth": req.body.projectStartMonth,
                            "projectStartYear": req.body.projectStartYear,
                            "projectLink": req.body.projectLink,
                            "projectEndMonth": "",
                            "projectEndYear": 0
                        },
                        { new: true }).then((data) => res.status(200).json({ "Message": "Project Updated..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
                else {
                    await userProject.findByIdAndUpdate(req.body.id,
                        {
                            "projectName": req.body.projectName,
                            "description": req.body.description,
                            "projectLink": req.body.projectLink,
                            "projectStartMonth": req.body.projectStartMonth,
                            "projectStartYear": req.body.projectStartYear,
                            "projectEndMonth": req.body.projectEndMonth,
                            "projectEndYear": req.body.projectEndYear
                        },
                        { new: true }).then((data) => res.status(200).json({ "Message": "Project Updated..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to delete user project 
export const deleteUserProject = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            await userProject.findByIdAndDelete(req.query.id).then(() => res.status(200).json({ "Message": "Project Deleted..!!" })).catch((err) => res.status(500).json({ "Message": err }))
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(400).json({ "Message": "Something Went Wrong!!" });
    }
}