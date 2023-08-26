import { userprofile } from "../../Models/Profile.js";
import { validateCource } from "../../Validation/Validate.Course.js";
import { userCource } from "../../Models/UserCource.js";

// Function to add userCource
export const addCourses = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValiadteCource = await validateCource(req.body.courceName);

      if (ValiadteCource.error) {
        res
          .status(403)
          .json({ Messgae: ValiadteCource.error.details[0].message });
      } else {
        const newCource = {
          userId: userData._id,
          courceName: req.body.courceName,
          number: req.body.number,
          associatewith: req.body.associatewith,
        };

        const usercource = new userCource(newCource);
        await usercource
          .save()
          .then((data) =>
            res.status(200).json({ Message: "Cource Added..!!", Data: data })
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

// Functin to get userCource
export const getUserCources = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });
    if (userData) {
      const courceData = await userCource.find({ userId: userData._id });
      res.status(200).json({ Message: courceData });
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to edit courceData
export const updateCourceData = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      const ValiadteCource = await validateCource(req.body.courceName);

      if (ValiadteCource.error) {
        res
          .status(403)
          .json({ Messgae: ValiadteCource.error.details[0].message });
      } else {
        await userCource.findByIdAndUpdate(req.body.id,req.body,{new:true}).then((data)=>res.status(200).json({"Message":data})).catch((err)=>res.status(500).json({"Message":err}))
        }
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};

// Function to delete userCource data
export const deleteUserCource = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {
      await userCource.findByIdAndDelete(req.query.id)
        .then(() => res.status(200).json({ Message: "Cource Deleted..!!" }))
        .catch((err) => res.status(500).json({ Message: err }));
    } else {
      res.status(400).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
