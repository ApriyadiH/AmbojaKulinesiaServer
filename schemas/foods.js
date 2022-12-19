const mongoose = require("mongoose");

const foodsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    foodName: {
      type: String,
    },
    region: {
      type: String,
    },
    likes: {
      type: Number,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
  },
);

foodsSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Foods", foodsSchema);
