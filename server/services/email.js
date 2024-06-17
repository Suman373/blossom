const nodemailer = require('nodemailer');
const generatePDF = require('./generatePDF');
const fs = require('fs');

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

// const pdfName = await generatePDF({ name: "Suman Roy" }, "donation");
// console.log('PDF Name', pdfName);
const emailPayload = {
    // recipient: "iamroy53@gmail.com",
    // subject: "Blossom: Thank you for your Generous Donation",
    // text: "Thank you for your generous donation ❤️. Your support is greatly appreciated and will make a significant impact.\n\nPlease find your donation receipt attached to this email.Thank you once again for your kindness and support.\n\nBest regards, Blossom\n https://blossom-web-v1.vercel.app",
    // attachments: [{
    //     filename: `${pdfName}`,
    //     path: `./services/outputs/${pdfName}`,
    //     contentType: 'application/pdf'
    // }]
}

// clear outputs dir
// setTimeout(() => {
//     fs.unlinkSync(`./services/outputs/${pdfName}`);
// }, 5000);

module.exports = sendMail;
