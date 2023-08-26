import { signup } from '../Models/SignUp.js';
import { emailValidation } from "../Validation/ForgetPassword.js";
import { forgetpasswordotp } from '../Models/ForgetPassword.otp.js';
import { userMail } from '../Utils/Mail.js';
import { ForgrtOTPTemplete } from '../View/ForgrtOTP.js';
import { userprofile } from '../Models/Profile.js'

export const forgetPassword = async (req, res) => {

    try {
        const email = req.body.email;
        const result = emailValidation({ email });

        if (result.error) {
            res.status(200).json({ "Message": result.error.details[0].message });
        }
        else {
            const data = await signup.findOne({ "email": req.body.email });

            if (data) {
                const newOTP = Math.floor(Math.random() * 1000000)

                const forgetOTP = {
                    email: req.body.email,
                    OTP: newOTP.toString()
                }

                const userData = await forgetpasswordotp.findOne({ "email": req.body.email })
                if (userData) {

                    const userdata = await userprofile.findOne({ "email": userData.email })
                    console.log(userdata.userImage)
                    const templete = ForgrtOTPTemplete(userdata.firstName, userdata.lastName, newOTP.toString(), userdata.userImage)

                    const usermail = await userMail(userData.email, templete)

                    if (usermail.response) {
                        await forgetpasswordotp.findByIdAndUpdate(userData._id, { "OTP": newOTP.toString() }, { new: true }).then((data) => res.status(200).json({ "Message": "OTP Cuccessfully Created", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
                    }
                    else {
                        res.status(500).json({ "Message": "Please try again" })
                    }
                }
                else {
                    const forgetotp = new forgetpasswordotp(forgetOTP)

                    const userdata = await userprofile.findOne({ "email": forgetotp.email })
                    const templete = ForgrtOTPTemplete(userdata.firstName, userdata.lastName, newOTP.toString(), userdata.userImage)

                    const usermail = await userMail(forgetotp.email, templete)

                    if (usermail.response) {
                        await forgetotp.save().then((data) => res.status(200).json({ "Message": "OTP Cuccessfully Created", "Data": data }))
                    }
                    else {
                        res.status(500).json({ "Message": "Please try again" })
                    }

                }
            }
            else {
                res.status(200).json({ "Message": "User not exist" });
            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}