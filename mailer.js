const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const executives = [
    'pranav.singh2024@nst.rishihood.edu.in',
    'mitul.bhatia2024@nst.rishihood.edu.in',
    'jivit.rana2024@nst.rishihood.edu.in',
    'shreyash.golhani2024@nst.rishihood.edu.in',
    'ranajeet.roy2024@nst.rishihood.edu.in',
    'narendra.singh2024@nst.rishihood.edu.in'
];

async function sendRegistrationEmails({ name, email, phone, companySize }) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('SMTP credentials missing, skipping email sending.');
        return;
    }

    try {
        const mailsDir = path.join(process.cwd(), 'mails');
        
        // 1. Send email to client
        let clientMailHtml = '';
        try {
            clientMailHtml = fs.readFileSync(path.join(mailsDir, 'mail_client.html'), 'utf8');
        } catch (e) {
            console.error('Failed to read mail_client.html:', e.message);
        }
        
        if (clientMailHtml) {
            await transporter.sendMail({
                from: `"raindeer.social" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                to: email,
                subject: 'Welcome to raindeer.social',
                html: clientMailHtml
            });
        }
        
        // 2. Send email to executives
        let execMailHtml = '';
        try {
            execMailHtml = fs.readFileSync(path.join(mailsDir, 'mail_executive.html'), 'utf8');
        } catch (e) {
            console.error('Failed to read mail_executive.html:', e.message);
        }

        if (execMailHtml) {
            execMailHtml = execMailHtml.replace(/\{\{name\}\}/g, name || 'N/A')
                                       .replace(/\{\{email\}\}/g, email || 'N/A')
                                       .replace(/\{\{phone\}\}/g, phone || 'N/A')
                                       .replace(/\{\{company\}\}/g, companySize || 'N/A');
                                       
            await transporter.sendMail({
                from: `"raindeer.social System" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                to: 'raindeer.social@gmail.com',
                cc: executives.join(', '),
                subject: `New Waitlist Signup: ${name}`,
                html: execMailHtml
            });
        }
        
        console.log(`Emails sent successfully for ${email}`);
    } catch (error) {
        console.error('Error sending emails:', error);
    }
}

module.exports = { sendRegistrationEmails };
