import { otp } from "../Models/Signup.otp.js";
import { signup } from "../Models/SignUp.js";
import bcrypt from 'bcryptjs'
import { userprofile } from "../Models/Profile.js";
import jwt from 'jsonwebtoken'
import { userEducation } from "../Models/UserEducation.js";
import { userExperience } from "../Models/UserExperience.js";

export const checkUserOTP = async (req, res) => {

    // try {
    const checkUser = await otp.findOne({ "email": req.body.email })

    if (checkUser) {
        // console.log(req.body)
        if (checkUser.OTP === req.body.OTP) {
            const hashPassword = await bcrypt.hash(req.body.password, 10)

            const userData = {
                email: req.body.email,
                password: hashPassword
            }

            const token = jwt.sign({ userData }, "DeepsLinkedIn")

            const newusersignup = new signup(userData)
            await newusersignup.save().then().catch()

            if (req.body.education) {

                const data = new userprofile(req.body);
                await data.save(data).then().catch();

                const userdata = await userprofile.findOne({ "email": req.body.email })
                // console.log(userData)

                const newEducation = {
                    userId: userdata._id,
                    instituteName: req.body.education[0].CollegeName,
                    startYear: req.body.education[0].startYear,
                    startMonth: req.body.education[0].startMonth,
                    endYear: req.body.education[0].endYear,
                    endMonth: req.body.education[0].endMonth
                }

                console.log(newEducation)

                const newUserEducation = new userEducation(newEducation)
                await newUserEducation.save().then(() => res.status(200).json({ "Token": token })).catch((err) => res.status(500).json({ "Message": err }))
            }
            else {
                if (req.body.experienceEndMonth !== "") {

                    const data = new userprofile(req.body);
                    await data.save(data).then().catch();

                    const userdata = await userprofile.findOne({ "email": req.body.email })
                    // console.log(userdata)

                    const newExperience = {
                        userId: userdata._id,
                        companyName: req.body.experience[0].companyName,
                        employementType: req.body.experience[0].employeementType,
                        jobTitle: req.body.experience[0].jobTitle,
                        startYear: req.body.experience[0].experienceStartYear,
                        startMonth: req.body.experience[0].experienceStartMonth,
                        endMonth: req.body.experience[0].experienceEndMonth,
                        endYear: req.body.experience[0].experienceEndYear
                    }

                    const newUserExperience = new userExperience(newExperience)
                    console.log(newUserExperience)
                    await newUserExperience.save().then(() => res.status(200).json({ "Token": token })).catch((err) => res.status(500).json({ "Message": err }));
                }
                else {
                    const data = new userprofile(req.body);
                    // await data.save(data).then().catch();

                    const userdata = await userprofile.findOne({ "email": req.body.email })

                    const newExperience = {
                        userId: userdata._id,
                        companyName: req.body.experience[0].companyName,
                        employementType: req.body.experience[0].employeementType,
                        jobTitle: req.body.experience[0].jobTitle,
                        startYear: req.body.experience[0].experienceStartYear,
                        startMonth: req.body.experience[0].experienceStartMonth,
                        endMonth: "",
                        endYear: 0
                    }

                    const newUserExperience = new userExperience(newExperience)
                    await newUserExperience.save().then(() => res.status(200).json({ "Token": token })).catch((err) => res.status(500).json({ "Message": err }));
                }
            }
        }
        else {
            res.status(200).json({ "Message": "Wrong OTP" })
        }
    }
    else {
        res.status(204).json({ "Message": "Something went Wrong!!" })
    }
    // } catch (error) {
    //     res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    // }
}