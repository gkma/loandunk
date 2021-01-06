require("dotenv").config();
const sendGridClient = require("@sendgrid/mail");

sendGridClient.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = (event, context, callback) => {
  const msg = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  sendGridClient
    .send(msg)
    .then(() => {
      console.log("Email sent");
      callback(null, { statusCode: 200, body: "OK" });
    })
    .catch((error) => {
      console.error(error);
      callback(error, null);
    });
};
