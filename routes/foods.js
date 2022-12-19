const express = require("express");
// const Foods = require("../schemas/foods");

const router = express.Router();

router.get("/foods", async (req, res) => {
  return res.status(200).send({ message: "ayam goreng"});
});

module.exports = router;
