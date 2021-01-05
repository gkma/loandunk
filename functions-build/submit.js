require("dotenv").config();

const process = require("process");
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");
const { parse } = require("json2csv");

const auth = {
  auth: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const transporter = nodemailer.createTransport(mailGun(auth));

exports.handler = (event, context, callback) => {
  const data = Object.values(JSON.parse(event.body));
  const fields = ["question", "answer"];
  const options = { fields };
  const csv = parse(data, options);

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER,
    subject: "New inquiry from LoanDunk.com",
    text: "See attached CSV.",
    attachments: [
      {
        filename: "visitor.csv",
        content: csv,
      },
    ],
  };

  try {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        callback(error);
      } else {
        callback(null, {
          statusCode: 200,
          body: "Ok",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: "Email failed." };
  }
};
