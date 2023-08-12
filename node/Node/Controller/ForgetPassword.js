import { signup } from '../Models/SignUp.js';
import { emailValidation } from "../Validation/ForgetPassword.js";
import { forgetpasswordotp } from '../Models/ForgetPassword.otp.js';
import nodemailer from 'nodemailer'

export const forgetPassword = async (req, res) => {

    try {
        const email = req.body.email;
        const result = emailValidation({ email });

        if (result.error) {
            res.status(200).send(result.error.details[0].message);
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
                        to: userData.email,
                        subject: "OTP from linkedIn",
                        text: "OTP to reset your password " + newOTP.toString()
                    }

                    transpoter.sendMail(mailOption, function (err) {
                        if (err) console.log(err)
                        else console.log("")
                    })

                    await forgetpasswordotp.findByIdAndUpdate(userData._id, { "OTP": newOTP.toString() }, { new: true }).then((data) => res.status(200).json({ "Message": "OTP Cuccessfully Created", "Data": data })).catch((err) => res.status(500).json({ "Message": err }))
                }
                else {
                    const forgetotp = new forgetpasswordotp(forgetOTP)
                    console.log(forgetotp)

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
                        to: forgetotp.email,
                        subject: "OTP from linkedIn",
                        text: "OTP to reset your password " + newOTP.toString()
                    }

                    transpoter.sendMail(mailOption, function (err,info) {
                        if (err) console.log(err)
                        else console.log(info.response)
                    })

                    await forgetotp.save().then((data) => res.status(200).json({ "Message": "OTP Successfully Created", "Data": data }))
                }
            }
            else {
                res.status(204).send("User not exist");
            }
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}