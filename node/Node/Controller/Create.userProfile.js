import { userprofile } from "../Models/Profile.js";
import { otp } from "../Models/Signup.otp.js";
import nodemailer from 'nodemailer'

// Function to sent a mail to user for account registration
export const addUser = async (req, res) => {
    try {
        const checkUSer = await userprofile.findOne({ "email": req.body.email })

        if (checkUSer) {
            res.json({ "Message": "User Already Exist" })
        }
        else {
            const OTP = Math.floor(Math.random() * 1000000)
            const newOTP = {
                email: req.body.email,
                OTP: OTP.toString()
            }

            const chekUser = await otp.findOne({ "email": req.body.email })
            console.log(chekUser)
            if (chekUser) {

                await otp.findByIdAndUpdate(chekUser._id, { "OTP": OTP.toString() }, { new: true }).then().catch()

                const transpoter = nodemailer.createTransport({
                    host: "mail.mailtest.radixweb.net",
                    port: "465",
                    secure: "false",
                    auth: {
                        user: "testdotnet@mailtest.radixweb.net",
                        pass: 'Radix@web#8'
                    }
                });

                const mailOption = {
                    from: "testdotnet@mailtest.radixweb.net",
                    to: chekUser.email,
                    subject: "OTP from linkedIn",
                    text: OTP.toString()
                }

                transpoter.sendMail(mailOption, function (err) {
                    if (err) res.json({ "Message": "Something went wrong" })
                    else res.json({ "Message": "OTP Generated Successfully" })
                })

            }
            else {
                const newotp = new otp(newOTP)
                // console.log(newotp)

                await newotp.save().then().catch()

                const transpoter = nodemailer.createTransport({
                    host: "mail.mailtest.radixweb.net",
                    port: "465",
                    secure: "false",
                    auth: {
                        user: "testdotnet@mailtest.radixweb.net",
                        pass: 'Radix@web#8'
                    }
                });

                const mailOption = {
                    from: "testdotnet@mailtest.radixweb.net",
                    to: newotp.email,
                    subject: "OTP from linkedIn",
                    text: OTP.toString()
                }

                transpoter.sendMail(mailOption, function (err) {
                    if (err) res.status(500).json({ "Message": "Something went wrong" })
                    else res.status(200).json({ "Message": "OTP Generated Successfully" })
                })

            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}