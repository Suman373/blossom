const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_UNAME,
        pass: process.env.SMTP_PASS
    }
});


const sendMail = async (payload) => {
    try {
        const mailOptions = {
            from: "sum4formsubmissions404@gmail.com",
            to: `${payload.recipient}`,
            subject: payload?.subject,
            text: payload?.text,
            html: payload?.html,
            attachments: payload?.attachments
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log(`Email sent to ${payload?.recipient} with emailId ${info.messageId}`);
        });
    } catch (error) {
        console.log("Error while sending email\n");
        console.log(error);
    }
}

module.exports = sendMail;
