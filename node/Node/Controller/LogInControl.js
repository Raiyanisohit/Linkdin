import { signup } from "../Models/SignUp.js";
import { loginUser } from "../Validation/LogInUser.js";
import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt';
import bcrypt from 'bcryptjs';

export const logInUser = async (req, res) => {

    try {
        const data = loginUser(req.body);

        if (data.error) {
            res.send(data.error.details[0].message);
        }
        else {
            const userData = await signup.findOne({ email: data.value.email });
            // console.log("userData",userData);

            if (userData) {
                const val = await bcrypt.compare(req.body.password, userData.password);
                if (val) {
                    const token = jwt.sign({ userData }, "DeepsLinkedIn", { expiresIn: "10hr" });
                    // res.cookies("token",token)   
                    res.status(200).json({ "token": token })
                }
                else {
                    res.status(401).send("Wrong Password");
                }
            }
            else {
                res.status(204).send("User Not Found!!!");
            }
        }

    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
} 