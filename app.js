const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// API untuk mengetes server
app.get("/", (req, res) => {
  res.send("Testing ayam goreng");
});

app.listen(port, () => {
  console.log(port, "Server is open with port!");
});