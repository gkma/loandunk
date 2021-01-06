require("dotenv").config();

const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const { parse } = require("json2csv");

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    user: "api",
    pass: process.env.MAILGUN_API_KEY,
  },
};

const nodemailerMailGun = nodemailer.createTransport(mailgun(auth));

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

  nodemailerMailGun.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error at sendMail: ", err);
      callback(null, {
        statusCode: 500,
        // headers,
        body: JSON.stringify(err),
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
  if (event.httpMethod === "POST") {
    const raw = Object.values(JSON.parse(event.body));
    const fields = ["question", "answer"];
    const options = { fields };
    const csv = parse(raw, options);

    sendMail(csv, callback);
  }
};
