import { userprofile } from "../../Models/Profile.js";
import { validateEducation } from "../../Validation/Validate.education.js";
import { userEducation } from "../../Models/UserEducation.js";

// Function to add user education
export const addUserEducation = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    if (userData) {
      const ValidateEducation = await validateEducation(
        req.body.instituteName,
        req.body.startYear,
        req.body.endYear,
        req.body.startMonth,
        req.body.endMonth
      );

      if (ValidateEducation.error) {
        res
          .status(403)
          .json({ Message: ValidateEducation.error.details[0].message });
      } else {
        const newEducation = {
          userId: userData._id,
          instituteName: req.body.instituteName,
          degree: req.body.degree,
          studyField: req.body.studyField,
          startYear: req.body.startYear,
          startMonth: req.body.startMonth,
          descprition: req.body.descprition,
          endYear: req.body.endYear,
          endMonth: req.body.endMonth,
          grade: req.body.grade,
        };

        const neweducation = new userEducation(newEducation);
        await neweducation
          .save()
          .then((data) =>
            res.status(200).json({ Message: "Education Added!!", Data: data })
          )
          .catch((err) => res.startMonth(500).json({ Message: err }));
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to getUserEducation data
export const getUserEducation = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
        const id = req.query.id
        if(id){
            const educationData = await userEducation.find({ userId: id });
            res.status(200).json({ Message: educationData });
        }
        else{
            const educationData = await userEducation.find({ userId: userData._id });
            res.status(200).json({ Message: educationData });
        }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to edit user education data
export const editUserEducation = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValidateEducation = await validateEducation(
        req.body.instituteName,
        req.body.startYear,
        req.body.endYear,
        req.body.startMonth,
        req.body.endMonth
      );

      if (ValidateEducation.error) {
        res
          .status(400)
          .json({ Message: ValidateEducation.error.details[0].message });
      } else {
        await userEducation
          .findByIdAndUpdate(req.body.id, req.body, { new: true })
          .then(() =>
            res.status(200).json({ Message: "Education Updated" })
          )
          .catch((err) => res.status(500).json({ Message: err }));
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// function to delete user education
export const deleteUserEducation = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      await userEducation
        .findByIdAndDelete(req.query.id)
        .then(() =>
          res.status(200).json({ Message: "Education Deleted Succesfully!!" })
        )
        .catch((err) => res.status(500).json({ Message: err }));
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
