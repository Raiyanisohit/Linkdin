import { signup } from '../Models/SignUp.js';
// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import { signupuser, checkUser } from "../Validation/SignupUser.js";
import { userprofile } from '../Models/Profile.js';

// Function to check user exist or not
const checkUserExist = async (req, res) => {

    try {
        const data = req.body;

        const userData = await userprofile.findOne({ "email": data.email });

        if (userData) {
            res.status(200).json({ "Message": "User already Exist!!" })
        }
        else {
            const response = checkUser(data);

            if (response.error) {
                res.status(200).json({ "Message": response.error.details[0].message })
            }
            else {
                res.status(200).json({ "Message": "New User" })
            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

const registerUser = async (req, res) => {
    try {
        const data = req.body;

        const userData = await signup.findOne({ "email": data.email });
        if (userData) {
            res.status(200).json({ "Message": "User already Exist!!" })
        }
        else {
            const response = signupuser(data);

            if (response.error) {
                res.json({ "Message": response.error.details[0].message })
            }
            else {
                data.password = await bcrypt.hash(req.body.password, 16);
                const signUpUser = new signup(data);
                signUpUser.save().then((data) => res.status(200).send(data)).catch((err) => res.status(500).send(err.message))
            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}

export { registerUser, checkUserExist };