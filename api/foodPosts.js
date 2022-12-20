const express = require("express");
// const FoodPosts = require("../schemas/foodPosts");
const Tester = require("../schemas/test");

const router = express.Router();

// Test Create
router.post("/foods", async (req, res) => {
  const testId = "test"
  const name = "ayam"

  const createTest = await Tester.create({
    testId,
    name
  });

  res.json({
    message: "test tambah berhasil",
    data_baru: createTest });
});

// Test Read
router.get("/foods", async (req, res) => {
  const semuaTester = await Tester.find();

  const results = semuaTester.map((isi_tester) => {
		return {
      testId: isi_tester.testId,
      name: isi_tester.name,
      postId: isi_tester.postId 
    };
  });

  res.json({
    data: results
  });
});

// Test update
router.patch("/foods/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId)
  const newname = "bebek"

  await Tester.updateOne({ postId }, { $set: { name: newname } });
  res.json({
    message: "ayam jadi bebek",
  });
});
  
// Test Delete
router.delete("/foods/:postId", async (req, res) => {
  const { postId } = req.params;
  console.log(postId)

  await Tester.deleteOne({ postId });
  res.json({
    message: "dihapus",
  });
});

module.exports = router;
