const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: 'sum4formsubmissions404@gmail.com',
        pass: 'iyug vyzn nukt pcwh'
    }
});

// const emailPayload={
//     recipient:"iamroy53@gmail.com",
//     subject:"Hi am Mia, from NFS MW 2012",
//     text:"Test for testing blossom email setup with smtp",
// }

const sendMail = async (payload) => {
    try {
        const mailOptions = {
            from: "sum4formsubmissions404@gmail.com",
            to: `${payload.recipient}`,
            subject: payload.subject,
            text: payload.text,
            html: payload.html
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
