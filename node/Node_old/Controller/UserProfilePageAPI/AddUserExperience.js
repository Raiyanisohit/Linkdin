import { userprofile } from "../../Models/Profile.js";
import { validateExperience } from "../../Validation/Validate.Experience.js";
import { userExperience } from "../../Models/UserExperience.js";

// Function to add user experience
export const addUserExperience = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValidatExperience = validateExperience(
        req.body.companyName,
        req.body.employementType,
        req.body.jobTitle,
        req.body.location,
        req.body.locationType,
        req.body.startYear,
        req.body.startMonth
      );

      if (ValidatExperience.error) {

        res.status(400).json({ Message: ValidatExperience.error.details[0].message });

      }
      else {
        if (!req.body.endYear) {
          if (req.body.profileHeadline === "") {
            const newExperience = {
              userId: userData._id,
              companyName: req.body.companyName,
              employementType: req.body.employementType,
              jobTitle: req.body.jobTitle,
              location: req.body.location,
              locationType: req.body.locationType,
              startYear: req.body.startYear,
              startMonth: req.body.startMonth,
              endMonth: "",
              endYear: "",
            };

            const userexperience = new userExperience(newExperience);

            await userexperience.save().then((data) => res.status(200).json({ Message: "Experience Added..!", Data: data })).catch((err) => res.status(500).json({ Message: err }));
          }
          else {
            const newExperience = {
              userId: userData._id,
              companyName: req.body.companyName,
              employementType: req.body.employementType,
              jobTitle: req.body.jobTitle,
              location: req.body.location,
              locationType: req.body.locationType,
              startYear: req.body.startYear,
              startMonth: req.body.startMonth,
              endMonth: "",
              endYear: "",
            };

            await userprofile.findByIdAndUpdate(userData._id, { profileHeadline: req.body.profileHeadline, }).then().catch();

            const userexperience = await new userExperience(newExperience);

            await userexperience.save().then((data) => res.status(200).json({ Message: "Experience Added..!", Data: data })).catch((err) => res.status(500).json({ Message: err }));
          }
        } else {
          const newExperience = {
            userId: userData._id,
            companyName: req.body.companyName,
            employementType: req.body.employementType,
            jobTitle: req.body.jobTitle,
            location: req.body.location,
            locationType: req.body.locationType,
            startYear: req.body.startYear,
            startMonth: req.body.startMonth,
            endMonth: req.body.endMonth,
            endYear: req.body.endYear,
          };

          const userexperience = await new userExperience(newExperience);

          await userexperience.save().then((data) => res.status(200).json({ Message: "Experience Added..!", Data: data })).catch((err) => res.status(500).json({ Message: err }));
        }
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to get user experience
export const getUserExperience = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const id = req.query.id;
      if (id) {
        const experienceData = await userExperience.find({ userId: id });
        res.status(200).json({ Message: experienceData });
      }
      else {
        const experienceData = await userExperience.find({ userId: userData._id });
        res.status(200).json({ Message: experienceData });
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to edit user experience
export const editUserExperience = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValidateExperience = await validateExperience(req.body.companyName, req.body.employementType, req.body.jobTitle, req.body.location, req.body.locationType, req.body.startYear, req.body.startMonth);

      if (ValidateExperience.error) {
        res.status(400).json({ Message: ValidateExperience.error.details[0].message });
      }
      else {
        if ((req.body.endYear === "def" || req.body.endYear === "") && (req.body.endMonth === "def" || req.body.endMonth === "")) {
          await userExperience.findByIdAndUpdate(req.body.id,
            {
              "companyName": req.body.companyName,
              "employementType": req.body.employementType,
              "jobTitle": req.body.jobTitle,
              "location": req.body.location,
              "locationType": req.body.locationType,
              "startYear": req.body.startYear,
              "startMonth": req.body.startMonth,
              "endMonth": "",
              "endYear": ""
            }, { new: true })
            .then((data) => res.status(200).json({ "Message": "Experience Updated..!!", "Data": data })).catch((err) => res.status(500).josn({ "Message": err }));
        }
        else {
          await userExperience.findByIdAndUpdate(req.body.id,
            {
              "companyName": req.body.companyName,
              "employementType": req.body.employementType,
              "jobTitle": req.body.jobTitle,
              "location": req.body.location,
              "locationType": req.body.locationType,
              "startYear": req.body.startYear,
              "startMonth": req.body.startMonth,
              "endMonth": req.body.endMonth,
              "endYear": req.body.endYear
            }, { new: true })
            .then((data) => res.status(200).json({ "Message": "Experience Updated..!!", "Data": data })).catch((err) => res.status(500).josn({ "Message": err }));
        }
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to delete user experience
export const deleteUserExperience = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      await userExperience.findByIdAndDelete(req.query.id).then(() => res.status(200).json({ Message: "Experience Deleted" })).catch((err) => res.status(500).json({ Message: err }));
    }
    else {
      res.status(400).json({ Message: "Something Went Wrong!!!" });
    }
  }
  catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
