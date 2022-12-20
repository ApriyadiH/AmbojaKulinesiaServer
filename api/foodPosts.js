const express = require("express");
// const FoodPosts = require("../schemas/foodPosts");

const router = express.Router();

router.get("/foods", async (req, res) => {
  return res.status(200).send({ message: {FoodPosts}});
});

module.exports = router;
