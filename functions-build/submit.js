require("dotenv").config();

// const nodemailer = require("nodemailer");
// const mailgun = require("nodemailer-mailgun-transport");
// const { parse } = require("json2csv");
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  // MAILGUN_URL,
  EMAIL_FROM,
  EMAIL_TO,
} = process.env;

const mailgun = require("mailgun.js");

const mg = mailgun.client({ username: "api", key: MAILGUN_API_KEY });

// const auth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
// "h:Authorization": `Basic ${Buffer.from(`api${MAILGUN_API_KEY}`).toString(
//   "base64"
// )}`,
//   },
// };

// const nodemailerMailGun = nodemailer.createTransport(mailgun(auth));

// function sendMail(csv, callback) {
//   const mailOptions = {
//     from: `Loan Dunk <${process.env.EMAIL_FROM}>`,
//     to: process.env.EMAIL_TO,
//     subject: "New inquiry from LoanDunk.com",
//     text: "See attached CSV.",
//     attachments: [
//       {
//         filename: "visitor.csv",
//         content: csv,
//       },
//     ],
//   };

//   nodemailerMailGun.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log("Error at sendMail: ", err);
//       callback(null, {
//         statusCode: 500,
//         body: JSON.stringify(err),
//       });
//     } else {
//       callback(null, {
//         statusCode: 200,
//         body: JSON.stringify(info),
//       });
//     }
//   });
// }

exports.handler = async (event) => {
  if (event.httpMethod === "POST") {
    // const raw = Object.values(JSON.parse(event.body));
    // const fields = ["question", "answer"];
    // const options = { fields };
    // const csv = parse(raw, options);
    // sendMail(csv, callback);

    const data = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: "New inquiry from LoanDunk.com",
      text: "See attached CSV.",
    };

    // return mailgun
    //   .messages()
    //   .send(mailData)
    //   .then((response) => response.json())
    //   .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
    //   .catch((error) => ({ statusCode: 500, body: JSON.stringify(error) }));

    mg.messages
      .create(MAILGUN_DOMAIN, data)
      .then((message) => console.log({ message }))
      .catch((error) => console.log({ error }));

    return { statusCode: 200 };
    // mailgun.messages().send(mailData, (error, body) => {
    //   if (error) {
    //     console.log("Error on mailgun send.");
    //     console.log({ error });
    //     return {
    //       statusCode: 500,
    //       body: JSON.stringify(error),
    //     };
    //   }
    //   console.log("Success on mailgun send.");
    //   console.log({ body });
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(body),
    //   };
    // });

    // .then((response) => response.json())
    // .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
    // .catch((error) => ({ statusCode: 500, body: JSON.stringify(error) }));

    //   , (error, body) => {
    //   if (error) {
    //     return {
    //       statusCode: 500,
    //       body: JSON.stringify(error),
    //     };
    //   }
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(body),
    //   };
    // });
  }
  return {
    statusCode: 405,
    body: "Method is not allowed",
  };
};
