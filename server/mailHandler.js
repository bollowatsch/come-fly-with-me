const nodemailer = require("nodemailer");

require('dotenv').config();

const sendConfirmationMail = function (userMailAddress, destinationName, bookingID) {
// Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const _url = `http://localhost:8080/result/${bookingID}`;
    //TODO: create better sounding email Body
    const mailBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <p>Congratulations! You just booked a trip to <strong>${destinationName}</strong>!</p>
            <p>You can see your detailed booking information 10 days in advance of your vacation by clicking this URL:</p>
            <p><a href="${_url}">Booking Details</a></p>
        </body>
        </html>
    `;
// Setup email data
    let mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userMailAddress,
        subject: 'Booking confirmation',
        html: mailBody
    };

// Send email
    transporter.sendMail(mailOptions).then(info => console.log("Mail successfully sent!")).catch(err => console.log(`Error sending email: ${err}`));
}
module.exports = sendConfirmationMail;