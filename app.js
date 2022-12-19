const express = require('express');
const router = require('./routes/index')

const connect = require("./schemas");
connect();

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("pesan bebas diisi apa aja");
});

app.use('/api', router)

app.listen(port, () => {
    console.log(port, 'Server is open with port!');
})