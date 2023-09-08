import { userprofile } from "../../Models/Profile.js";
import { validateLicenceAndCertificate } from "../../Validation/Validate.Licence.Certificate.js";
import { licenceAndCertificate } from "../../Models/UserLicenceAndCertificate.js";

// Function to add licence and certificate data
export const addLicenceAndCertificate = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email })

        if (userData) {
            const ValidateData = await validateLicenceAndCertificate(req.body.certificateName, req.body.organizationName);

            if (ValidateData.error) {
                res.status(400).json({ "Message": ValidateData.error.details[0].message });
            }
            else {

                const newLicenceAndCertificate = {
                    userId: userData._id,
                    certificateName: req.body.certificateName,
                    organizationName: req.body.organizationName,
                    issueDateMonth: req.body.issueDateMonth,
                    issueDateYear: req.body.issueDateYear === "def" || req.body.issueDateYear === "" ? 0 : req.body.issueDateYear,
                    expiryDateMonth: req.body.expiryDateMonth,
                    expiryDateYear: req.body.expiryDateYear === "def" || req.body.expiryDateYear === "" ? 0 : req.body.expiryDateYear
                };

                const newData = new licenceAndCertificate(newLicenceAndCertificate);
                await newData.save().then((data) => res.status(200).json({ "Message": "Data Added..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to get uset licence and certificate data
export const getLicenceAndCertificateData = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const id = req.query.id;

            if (id) {
                const licenceAndCertificateData = await licenceAndCertificate.find({ "userId": id });
                res.status(200).json({ "Message": licenceAndCertificateData });
            }
            else {
                const licenceAndCertificateData = await licenceAndCertificate.find({ "userId": userData._id });
                res.status(200).json({ "Message": licenceAndCertificateData });
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to edit user licence and certificate data
export const editLicenceAndCertificate = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            const ValidateData = await validateLicenceAndCertificate(req.body.certificateName, req.body.organizationName);

            if (ValidateData.error) {
                res.status(400).json({ "Message": ValidateData.error.details[0].message });
            }
            else {

                const newLicenceAndCertificate = {
                    userId: userData._id,
                    certificateName: req.body.certificateName,
                    organizationName: req.body.organizationName,
                    issueDateMonth: req.body.issueDateMonth === "def" || req.body.issueDateMonth === "" ? "" : req.body.issueDateMonth,
                    issueDateYear: req.body.issueDateYear === "def" || req.body.issueDateYear === "" ? 0 : req.body.issueDateYear,
                    expiryDateMonth: req.body.expiryDateMonth === "def" || req.body.expiryDateMonth === "" ? "" : req.body.expiryDateMonth,
                    expiryDateYear: req.body.expiryDateYear === "def" || req.body.expiryDateYear === "" ? 0 : req.body.expiryDateYear
                };

                await licenceAndCertificate.findByIdAndUpdate(req.body.id, newLicenceAndCertificate, { new: true }).then((data) => res.status(200).json({ "Message": "Data Updated..!!", "Data": data })).catch((err) => res.status(500).json({ "Message": err }));
            }
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

// Function to delete licence and certificate
export const deleteLicenceAndCertificate = async (req, res) => {
    try {
        const userData = await userprofile.findOne({ "email": req.body.email });

        if (userData) {
            await licenceAndCertificate.findByIdAndDelete(req.query.id).then(() => res.status(200).json({ "Message": "Data Deleted..!!" })).catch((err) => res.status(500).json({ "Message": err }));
        }
        else {
            res.status(400).json({ "Message": "Something Went Wrong!!" });
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}