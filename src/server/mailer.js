require("dotenv").config();

const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

function sendMail(csv) {
  const mailOptions = {
    from: "loandunkmortgageservices@gmail.com",
    to: "garron@equitysmartloans.com",
    subject: "Inquiry from LoanDunk.com",
    text: "See attached CSV.",
    attachments: [
      {
        filename: "visitor.csv",
        content: csv,
      },
    ],
  };

  transporter.sendMail(mailOptions);
}

module.exports = sendMail;
