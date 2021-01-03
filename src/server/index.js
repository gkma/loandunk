const { parse } = require("json2csv");
const express = require("express");
const path = require("path");
const sendMail = require("./mailer");

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(express.static("build"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../build", "index.html"))
);

app.post("/submit", (req, res) => {
  const data = Object.values(req.body);

  const fields = ["question", "answer"];
  const opts = { fields };

  const csv = parse(data, opts);
  sendMail(csv);

  res.json({ submit: "successful" });
});

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
