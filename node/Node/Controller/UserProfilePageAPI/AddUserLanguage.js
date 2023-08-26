import { userprofile } from "../../Models/Profile.js";
import { validateLanguage } from "../../Validation/Validate.language.js";
import { userLanguage } from "../../Models/UserLanguage.js";

// Function to add userLangauge
export const addUserLanguage = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    if (userData) {
      const ValidateData = await validateLanguage(req.body.language);

      if (ValidateData.error) {
        res
          .status(403)
          .json({ Message: ValidateData.error.details[0].message });
      } else {
        const newLanguage = {
          userId: userData._id,
          language: req.body.language,
          languageProficiency: req.body.languageProficiency,
        };

        const UserLanguage = new userLanguage(newLanguage);
        await UserLanguage.save()
          .then((data) =>
            res.status(200).json({ Message: "Language Added!!", Data: data })
          )
          .catch((err) => res.status(500).json({ Message: err }));
      }
    } else {
      res.status(200).json({ Message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to editLanguageData
export const editUserLanguage = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValidateData = await validateLanguage(req.body.language);

      if (ValidateData.error) {
        res
          .status(403)
          .json({ Message: ValidateData.error.details[0].message });
      } else {
        // await userLanguage.findByIdAndUpdate(req.body.id, { "language": req.body.language, "languageProficiency": req.body.languageProficiency }, { new: true }).then((data) => res.status(200).json({ "Message": "Data Updated", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))

        await userLanguage
          .findByIdAndUpdate(req.body.id, req.body, { new: true })
          .then((data) =>
            res.status(200).json({ Message: "Data Updated", Data: data })
          )
          .catch((err) => res.status(500).json({ Message: err }));
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to get all languages of user
export const getAllUserLanguage = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    const id = req.query.id;
    if (userData) {
      if (id) {
        const languageData = await userLanguage.find({ userId: id });
        res.status(200).json({ Message: languageData });
      } else {
        const languageData = await userLanguage.find({ userId: userData._id });
        res.status(200).json({ Message: languageData });
      }
    } else {
      res.status(400).json({ Message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to delete userLanguage
export const deleteUserLanguage = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      await userLanguage
        .findByIdAndDelete(req.query.id)
        .then((data) => res.status(200).json({ Message: "Language Deleted" }))
        .catch((err) => res.status(500).json({ Message: err }));
    } else {
      res.status(400).json({ Message: "Something Went Wrong" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
