import { userprofile } from "../../Models/Profile.js";
import { validateSkill } from "../../Validation/Validate.skill.js";
import { userSkill } from "../../Models/UserSkill.js";

// Function to get all user skills
export const getAllSkills = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    const id = req.query.id;

    if (userData) {
      if (id) {
        const userSkills = await userSkill.find({ userId: id });
        res.status(200).json({ Message: userSkills });
      } else {
        const userSkills = await userSkill.find({ userId: userData._id });
        res.status(200).json({ Message: userSkills });
      }
    } else {
      res.status(204).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Functio to add userSkill
export const addUserSkill = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    const ValidateSkill = validateSkill(req.body.skill);

    if (ValidateSkill.error) {
      res.status(403).json({ Message: ValidateSkill.error.details[0].message });
    } else {
      if (userData) {
        const skillObject = {
          userId: userData._id,
          skill: req.body.skill,
        };

        const newSkill = new userSkill(skillObject);
        await newSkill
          .save()
          .then((data) =>
            res.status(200).json({ Message: "Skill Added", Data: data })
          )
          .catch((err) => res.status(500).json({ Message: err }));

        // await userprofile.findByIdAndUpdate(userData._id, { $push: { "skills": req.body.skills } }, { _id: true, new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))
      } else {
        res.status(400).json({ Message: "Something Went Wrong!!" });
      }
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Functin to edit userSkill
export const editUserSkill = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValidateSkill = validateSkill(req.body.skill);

      if (ValidateSkill.error) {
        res.status().json({ Message: ValidateSkill.error.details[0].message });
      } else {
        await userSkill
          .findByIdAndUpdate(
            req.body.id,
            { skill: req.body.skill },
            { new: true }
          )
          .then((data) =>
            res.status(200).json({ Message: "Skill Updated", Data: data })
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

// Function ti deleteUserSkill
export const deleteUserSkill = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      await userSkill
        .findByIdAndDelete(req.query.id)
        .then(() =>
          res.status(200).json({ Message: "Skill Deleted Successfully..!!" })
        )
        .catch((err) => res.status(500).json({ Message: err }));
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
