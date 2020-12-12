const express = require("express");

const app = express();
const PORT = 8888;

app.get("/", (req, res) => res.send("LD"));

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
