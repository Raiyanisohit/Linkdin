import { forgetpasswordotp } from "../Models/ForgetPassword.otp.js";

export const forgetPasswordOTPCheck = async (req, res) => {

    try {
        const userdata = await forgetpasswordotp.findOne({ "email": req.body.email })

        if (userdata) {
            if (userdata.OTP === req.body.OTP) {
                res.status(200).json({ "Message": "Correct OTP" })
            }
            else {
                res.status(200).json({ "Message": "Wrong OTP" })
            }
        }
        else {
            res.status(204).json({ "Message": "User Not Found" })
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}