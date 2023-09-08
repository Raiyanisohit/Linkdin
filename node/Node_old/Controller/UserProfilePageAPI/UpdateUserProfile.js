import { userprofile } from "../../Models/Profile.js";

export const updateUserProfile = async (req, res) => {
  try {
    const userData = await userprofile.findOne({ email: req.body.email });

    if (userData) {

      await userprofile.findByIdAndUpdate(userData._id, { "firstName": req.body.firstName, "lastName": req.body.lastName, "city": req.body.city, "country": req.body.country, "profileHeadline": req.body.headline, "industry": req.body.industry }, { new: true }).then((data) => res.status(200).json({ "Message": data })).catch((err) => res.status(500).json({ "Message": err }))

    } else {
      res.status(204).json({ Message: "Something Went Wrong!!" });
    }
  } catch (error) {
    res.status(500).json({ Messsage: "Something went Wrong", Error: error });
  }
};
