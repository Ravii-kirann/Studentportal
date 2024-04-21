const nodeMailer = require('nodemailer');
require('dotenv').config();


const sendEmail = async (option) => {
    console.log(option,"option")
    try {
        const transporter = nodeMailer.createTransport({
            host: process.envEMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // Set to false if using TLS/SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass:  process.env.EMAIL_PASSWORD,
            }
        });

        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: option.email,
            subject: option.subject,
            text: option.message
        };

        // await transporter.sendMail(emailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email: " + error.message);
    }
}

module.exports = sendEmail;
