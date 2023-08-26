import { userprofile } from "../../Models/Profile.js";
import { validatePublication } from "../../Validation/Validate.Publication.js";
import { userPublication } from "../../Models/UserPublication.js";

// Function to add user publication data
export const addPublication = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidatePublicatoin = await validatePublication(req.body.title);

            if (ValidatePublicatoin.error) {
                res.status(400).json({ "Message": ValidatePublicatoin.error.details[0].message });
            }
            else {
                const newPublication = {
                    userId: userData._id,
                    title: req.body.title,
                    publication: req.body.publication,
                    publicationDateMonth: req.body.publicationDateMonth,
                    publicationDateYear: req.body.publicationDateYear,
                    publicationURL: req.body.publicationURL,
                    description: req.body.description
                };

                const savePublication = new userPublication(newPublication);
                await savePublication.save().then((data) => res.status(200).json({ "Message": "Publication Added..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to getUserPublication data
export const getUserPublicationData = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const id = req.query.id;

            if (id) {
                const publicationData = await userPublication.find({ "userId": id });
                res.status(200).json({ "Message": publicationData });
            }
            else {
                const publicationData = await userPublication.find({ "userId": userData._id });
                res.status(200).json({ "Message": publicationData });
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to edit user publication data
export const editUserPublication = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidatePublicatoin = await validatePublication(req.body.title);

            if (ValidatePublicatoin.error) {
                res.status(400).json({ "Message": ValidatePublicatoin.error.details[0].message });
            }
            else {
                await userPublication.findByIdAndUpdate(req.body.id, req.body, { new: true }).then((data) => res.status(200).json({ "Message": "Data Updated..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to delete user publication data
export const deleteUserPublication = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            await userPublication.findByIdAndDelete(req.query.id).then(() => res.status(200).json({ "Message": "Data Deleted..!!" })).catch((err) => res.status(500).json({ "Message": err }));
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}