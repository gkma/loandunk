require("dotenv").config();

const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const { parse } = require("json2csv");

// const headers = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Content-Type",
// };

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailgun(auth));

function sendMail(csv, callback) {
  const mailOptions = {
    from: `Loan Dunk <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    subject: "New inquiry from LoanDunk.com",
    text: "See attached CSV.",
    attachments: [
      {
        filename: "visitor.csv",
        content: csv,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(null, {
        statusCode: 500,
        // headers,
        body: JSON.stringify(error),
      });
    } else {
      callback(null, {
        statusCode: 200,
        // headers,
        body: JSON.stringify(info),
      });
    }
  });
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod === "POST" && event.path === "/api/submit") {
    const raw = Object.values(JSON.parse(event.body));
    const fields = ["question", "answer"];
    const options = { fields };
    const csv = parse(raw, options);

    sendMail(csv, callback);
  }
};
