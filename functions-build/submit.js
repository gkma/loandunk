require("dotenv").config();

const mailgun = require("mailgun-js");
// const { parse } = require("json2csv");

// const headers = {
// "Authorization":
// "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Headers": "Content-Type",
// };

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const url = process.env.MAILGUN_URL;

const mg = mailgun({ apiKey, domain, url });

const data = {
  from: `Loan Dunk <${process.env.EMAIL_FROM}>`,
  to: process.env.EMAIL_TO,
  subject: "New inquiry from LoanDunk.com",
  text: "See attached CSV.",
  // "h:username": "api",
  // "h:password": apiKey,
};

exports.handler = (event, context, callback) => {
  if (event.httpMethod === "POST") {
    mg.messages().send(data, (error, body) => {
      if (error) {
        console.log("Error at sendMail: ", error);
        callback(null, {
          statusCode: 500,
          // headers,
          body: JSON.stringify(error),
        });
      } else {
        callback(null, {
          statusCode: 200,
          // headers,
          body: JSON.stringify(body),
        });
      }
    });
  }
};

// const raw = Object.values(JSON.parse(event.body));
// const fields = ["question", "answer"];
// const options = { fields };
// const csv = parse(raw, options);

// sendMail(csv, callback);
// function sendMail(csv, callback) {
//   const mailOptions = {
//     attachments: [
//       {
//         filename: "visitor.csv",
//         content: csv,
//       },
//     ],
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log("Error at sendMail: ", error);
//       callback(null, {
//         statusCode: 500,
//         // headers,
//         body: JSON.stringify(error),
//       });
//     } else {
//       callback(null, {
//         statusCode: 200,
//         // headers,
//         body: JSON.stringify(info),
//       });
//     }
//   });
// }
