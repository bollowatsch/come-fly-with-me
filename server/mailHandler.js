const nodemailer = require("nodemailer");

require('dotenv').config();

const sendConfirmationMail = function (userMailAddress, destinationName, url) {
// Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    //TODO: create better sounding email Body
    const mailBody = `Congratulations! You just booked a trip to ${destinationName}!\n`
            +`You can see your detailed booking information 10 days in advance of your vacation by clicking this URL: \n`
            +`${url}\n`

// Setup email data
    let mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userMailAddress,
        subject: 'Booking confirmation',
        text: mailBody
    };

// Send email
    transporter.sendMail(mailOptions).then(info => console.log("Mail successfully sent!")).catch(err => console.log(`Error sending email: ${err}`));
}
module.exports = sendConfirmationMail;