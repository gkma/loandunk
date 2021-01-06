const sendGridClient = require("@sendgrid/mail");

exports.handler = (event, context, callback) => {
  const { EMAIL_FROM, EMAIL_TO, SENDGRID_API_KEY } = process.env;

  sendGridClient.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
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
