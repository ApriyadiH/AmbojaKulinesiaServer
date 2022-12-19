const express = require('express');
const router = require('./api/index');
require("dotenv").config();

const connect = require("./schemas");
connect();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("pesan bebas diisi apa aja");
});

app.use('/api', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})