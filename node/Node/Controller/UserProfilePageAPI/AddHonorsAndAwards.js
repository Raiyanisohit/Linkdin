import { userprofile } from "../../Models/Profile.js";
import { validateHonorsAndAwars } from "../../Validation/Validate.HonorsAndAward.js";
import { honorsAndAwards } from "../../Models/UserHonorsAndAwards.js";

// Function to add honors and awards
export const addHonorsAndAwards = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidateData = await validateHonorsAndAwars(req.body.titel);

            if (ValidateData.error) {
                res.status(403).json({ "Message": ValidateData.error.details[0].message });
            }
            else {
                const newHonorsAndAward = {
                    userId: userData._id,
                    titel: req.body.titel,
                    associateWith: req.body.associateWith,
                    issuer: req.body.issuer,
                    issueDateMonth: req.body.issueDateMonth,
                    issueDateYear: req.body.issueDateYear,
                    description: req.body.description
                }
                const newHonorsAndAwards = new honorsAndAwards(newHonorsAndAward);

                await newHonorsAndAwards.save().then((data) => res.status(200).json({ "Message": "Data Added..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to get honors and award data
export const getHonorsAndAward = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const id = req.query.id;

            if (id) {
                const honorsAndAwardsdData = await honorsAndAwards.find({ "userId": id });
                res.status(200).json({ "Message": honorsAndAwardsdData });
            }
            else {
                const honorsAndAwardsdData = await honorsAndAwards.find({ "userId": userData._id });
                res.status(200).json({ "Message": honorsAndAwardsdData });
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};

// Function to edit user honors and award data
export const editUserHonorsdAndAward = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidateData = await validateHonorsAndAwars(req.body.titel);

            if (ValidateData.error) {
                res.status(403).json({ "Message": ValidateData.error.details[0].message });
            }
            else {
                await honorsAndAwards.findByIdAndUpdate(req.body.id, req.body, { new: true }).then((data) => res.status(200).json({ "Message": "Data Updated..!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to delete honors ans awards data
export const deleteHonorsAndAward = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            await honorsAndAwards.findByIdAndDelete(req.query.id).then(() => res.status(200).json({ "Message": "Data Deleted..!!" })).catch((err) => res.status(500).json({ "Message": err }));
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
};