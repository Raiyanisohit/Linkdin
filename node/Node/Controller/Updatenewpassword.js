import { signup } from "../Models/SignUp.js";
// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs'
import { forgetPasswordValidation } from "../Validation/ForgetPassword.js";

export const updateNewPassword = async (req, res) => {

    try {
        const userData = await signup.findOne({ "email": req.body.email })

        if (userData) {

            const newPassword = req.body.password
            const result = await forgetPasswordValidation({ newPassword })

            if (result.error) {
                res.status(200).json({ "Message": result.error.details[0].message })
            }
            else {
                const hashPassword = await bcrypt.hash(req.body.password, 10)
                await signup.findByIdAndUpdate(userData._id, { "password": hashPassword }, { new: true }).then((data) => res.status(200).json({ "Message": "Password Updated", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
            }
        }
        else {
            res.status(204).json({ "Message": "User Not Exist" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}