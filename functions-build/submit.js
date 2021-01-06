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

const mailgun = require("mailgun-js")({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN,
  // url: MAILGUN_URL
});

// const auth = {
//   auth: {
//     api_key: process.env.MAILGUN_API_KEY,
//     domain: process.env.MAILGUN_DOMAIN,
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

    const mailData = {
      from: EMAIL_FROM,
      to: EMAIL_TO,
      "h:Authorization": `Basic ${Buffer.from(`api${MAILGUN_API_KEY}`).toString(
        "base64"
      )}`,
      subject: "New inquiry from LoanDunk.com",
      text: "See attached CSV.",
    };

    console.log({ mailData });

    // return mailgun
    //   .messages()
    //   .send(mailData)
    //   .then((response) => response.json())
    //   .then((data) => ({ statusCode: 200, body: JSON.stringify(data) }))
    //   .catch((error) => ({ statusCode: 500, body: JSON.stringify(error) }));

    const response = await mailgun.messages().send(mailData, (error, body) => {
      if (error) console.log({ error });
      else console.log({ body });
    });
    if (response.id) {
      return { statusCode: 200, body: JSON.stringify(response) };
    }

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
    statusCode: 500,
    body: "Error on mailgun send",
  };
};
