const sendGridClient = require("@sendgrid/mail");
const { parse } = require("json2csv");

exports.handler = (event, context, callback) => {
  const { EMAIL_FROM, EMAIL_TO, SENDGRID_API_KEY } = process.env;

  sendGridClient.setApiKey(SENDGRID_API_KEY);

  const raw = Object.values(JSON.parse(event.body));
  const fields = ["question", "answer"];
  const options = { fields };
  const csv = parse(raw, options);

  const buff = Buffer.from(csv);
  const csv64 = buff.toString("base64");

  const msg = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    subject: "New inquiry from LoanDunk.com",
    text: "See attached CSV.",
    attachments: [
      {
        filename: "inquiry.csv",
        content: csv64,
      },
    ],
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
