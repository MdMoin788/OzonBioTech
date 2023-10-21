
import nodemailer from 'nodemailer'

export const sendResponse = (res, token, user) => {
    console.log('hello from login')
    return res.status(201)
        .cookie('jwtToken', token, {
            secure: false,
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 1000 * 60 * 60),
            httpOnly: true,
        })
        .json({ success: true, user, token })
}


export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })
    console.log('options', options)
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendMail(mailOptions)
}