import { userprofile } from "../Models/Profile.js";

// function to addUserData
export const addUser = (req, res) => {
    try {
        const data = new userprofile(req.body);
        data.save(data).then((data) => res.status(200).send(data)).catch((err) => res.status(500).send(err));
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}