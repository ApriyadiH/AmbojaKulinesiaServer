const express = require('express');
const router = require('./api');
require("dotenv").config();

const connect = require("./schemas");
connect();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({extended: false}));

app.get("/", (req, res) => {
  res.send("pesan bebas diisi apa aja");
});

app.use('/api', router)

app.listen(port, () => {
  console.log(port, 'Server is open with port!');
})