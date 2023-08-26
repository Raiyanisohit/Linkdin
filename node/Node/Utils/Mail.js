import nodemailer from 'nodemailer'

export const userMail = async (email, templete) => {
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
        to: email,
        subject: "OTP from linkedIn",
        html: templete
    }

    return await transpoter.sendMail(mailOption)
}