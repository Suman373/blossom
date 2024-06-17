const { default: puppeteer } = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const handlebars = require('handlebars');
const uniqueName = require('../helpers/uniqueName');


// generate html template
const generateTemplate = async (payload, templateType) => {
    const hbsPath = path.join(__dirname, '..','templates', `${templateType}.hbs`);
    const hbsContent = fs.readFile(hbsPath,'utf-8');
    const template = handlebars.compile((await hbsContent).toString());
    const html = template(payload);
    return html;
}

// payload -> obj with details, templateType -> donation receipt, event rsvp, etc
const generatePDF = async (payload, templateType) => {
    try {
        // get pdf content
        const pdfContent = await generateTemplate(payload, templateType);
        // launch puppeteer and generate pdf
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        const uname = uniqueName();
        const pdfName = `donation_receipt${uname}.pdf`
        await page.setContent(pdfContent, { waitUntil: 'domcontentloaded' });
        await page.pdf({
            path: `./services/outputs/${pdfName}`,
            format: 'A4',
            printBackground: true
        })
        console.log("PDF creation success");
        await browser.close();
        return pdfName;
    } catch (error) {
        console.log("PDF generation failed", error);
    }
}

module.exports = generatePDF;