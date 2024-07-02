// ------ generate the invoice and send to user email

const path = require("path");
const sendMail = require("../services/email");
const generatePDF = require("../services/generatePDF");
const fs = require('fs');

// payload is templateData, templateType, customer email
const donationInvoice = async(pdfData, templateType, cust_email) => {
    try {
        const pdfName = await generatePDF(pdfData, templateType);
        if(!pdfName) throw new Error("PDF generation failed, could not send invoice");
        // abs path for invoice
        const pdfPath = path.join(__dirname,'..','services','outputs',pdfName);
        if (!fs.existsSync(pdfPath)) {
            throw new Error(`PDF file ${pdfName} does not exist at path ${pdfPath}`);
        }
        const emailPayload = {
            recipient: `${cust_email}`,
            subject: "Blossom: Thank you for your Generous Donation",
            text: "Thank you for your generous donation ❤️. Your support is greatly appreciated and will make a significant impact.\n\nPlease find your donation receipt attached to this email.Thank you once again for your kindness and support.\n\nBest regards, Blossom\n https://blossom-web-v1.vercel.app",
            attachments: [{
                filename: `${pdfName}`,
                path: pdfPath,
                contentType: 'application/pdf'
            }]
        }

        await sendMail(emailPayload);

        // clear outputs dir
        setTimeout(() => {
            fs.unlinkSync(pdfPath);
        }, 8000);
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = donationInvoice;