import { userprofile } from "../Models/Profile.js";
import { otp } from "../Models/Signup.otp.js";
import { userMail } from "../Utils/Mail.js";
import { createProfile } from "../View/CreateProfile.js";

// Function to sent a mail to user for account registration
export const addUser = async (req, res) => {
    try {
        const checkUSer = await userprofile.findOne({ "email": req.body.email })

        if (checkUSer) {
            res.json({ "Message": "User Already Exist" })
        }
        else{
            const OTP = Math.floor(Math.random() * 1000000)
            const newOTP = {
                email: req.body.email,
                OTP: OTP.toString()
            }
            
            const chekUser = await otp.findOne({ "email": req.body.email })
            // console.log(chekUser)
            if (chekUser) {
                // console.log(req.body)
                const template = createProfile(OTP.toString(), req.body.firstName, req.body.lastName)
                const usermail = await userMail(chekUser.email, template)
                // console.log(usermail,"Line 28")

                if (usermail.response) {
                    // console.log(req.body,"Inside if")
                    await otp.findByIdAndUpdate(chekUser._id, { "OTP": OTP.toString() }, { new: true }).then(() => res.status(200).json({ "Message": "OTP Generated Successfully" })).catch((err) => res.status(500).json({ "Message": "Something went wrong" }))
                }
                else {
                    // console.log("If else ")
                    res.status(500).json({ "Message": "Something went wrong" })
                }
            }
            else {
                const newotp = new otp(newOTP)
                const template = createProfile(OTP.toString(), req.body.firstName, req.body.lastName)
                const usermail = await userMail(newotp.email, template)

                if (usermail.response) {
                    await newotp.save().then(() => res.status(200).json({ "Message": "OTP Generated Successfully" })).catch(() => res.status(500).json({ "Message": "Something went wrong" }))
                }
                else {
                    // console.log("Else else")
                    res.status(500).json({ "Message": "Something went wrong" })
                }
            }
        }
    } catch (error) {
        // console.log("In catch")
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}