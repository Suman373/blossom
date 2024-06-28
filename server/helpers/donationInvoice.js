// ------ generate the invoice and send to user email

const sendMail = require("../services/email");
const generatePDF = require("../services/generatePDF");
const fs = require('fs');

// payload is templateData, templateType, customer email
const donationInvoice = async(pdfData, templateType, cust_email) => {
    try {
        const pdfName = await generatePDF(pdfData, templateType);
        
        const emailPayload = {
            recipient: `${cust_email}`,
            subject: "Blossom: Thank you for your Generous Donation",
            text: "Thank you for your generous donation ❤️. Your support is greatly appreciated and will make a significant impact.\n\nPlease find your donation receipt attached to this email.Thank you once again for your kindness and support.\n\nBest regards, Blossom\n https://blossom-web-v1.vercel.app",
            attachments: [{
                filename: `${pdfName}`,
                path: `./services/outputs/${pdfName}`,
                contentType: 'application/pdf'
            }]
        }

        await sendMail(emailPayload);

        // clear outputs dir
        setTimeout(() => {
            fs.unlinkSync(`./services/outputs/${pdfName}`);
        }, 8000);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = donationInvoice;