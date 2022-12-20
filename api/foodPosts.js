const express = require("express");
const Joi = require("joi");
const FoodPosts = require("../schemas/foodPosts");
const LikedPosts = require("../schemas/likedPosts");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const postSchema = Joi.object({
  foodName: Joi.string().required(),
  region: Joi.string().required(),
  description: Joi.string().required()
});

const urlSchema = Joi.object({
  url: Joi.string().pattern(new RegExp('^(https|http)://.+\.(png|jpg|jpeg)$')).required(),
});

router.post("/post", authMiddleware, async (req, res) => {
  try {
    const { foodName, region, description } = await postSchema.validateAsync({
      foodName: req.body.foodName,
      region: req.body.region,
      description: req.body.description,
    });

    const { imageUrls } = req.body;
    for (const url of imageUrls) {
      await urlSchema.validateAsync({ url: url })
    };

    const likes = 0;

    const { user } = res.locals;
    const userId = user._id;
    const isAdmin = user.isAdmin;

    if (isAdmin) {
      const status = 'approved';

      await FoodPosts.create({
        userId,
        foodName,
        region,
        imageUrls,
        likes,
        description,
        status
      })

      return res.status(201).send({ message: "Culinary successfully added." });
    } else {
      const status = 'pending';

      await FoodPosts.create({
        userId,
        foodName,
        region,
        imageUrls,
        likes,
        description,
        status
      })

      return res.status(201).send({ message: "Culinary successfully added to pending list. Please wait for admin to approve it." });
    }
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Invalid data format." })
  }

});

router.put("/post", authMiddleware, async (req, res) => {
  try {
    const { postId, imageUrls } = req.body;

    const { foodName, region, description } = await postSchema.validateAsync({
      foodName: req.body.foodName,
      region: req.body.region,
      description: req.body.description,
    });

    for (const url of imageUrls) {
      await urlSchema.validateAsync({ url: url })
    };

    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    const existPost = await FoodPosts.findById(postId).exec();

    if (!existPost) {
      return res.status(400).send({ message: 'Post not found.' });
    }

    const pastRegion = existPost.region;
    const pastFoodName = existPost.foodName;
    const pastDescription = existPost.description;
    let likes = existPost.likes;

    if ((pastRegion !== region && pastFoodName !== foodName) ||
      (pastFoodName !== foodName && pastDescription !== description)) {

      likes = 0;
      const postWithLike = await LikedPosts.find({ postId }).exec();

      if (postWithLike) {
        for (const likedPost of postWithLike) {
          await likedPost.delete();
        }
      }
    }

    if (isAdmin) {
      existPost.foodName = foodName;
      existPost.region = region;
      existPost.imageUrls = imageUrls;
      existPost.description = description;
      existPost.likes = likes;

      await existPost.save();
      return res.status(200).send({ message: "Post successfully edited." })
    } else {
      existPost.foodName = foodName;
      existPost.region = region;
      existPost.imageUrls = imageUrls;
      existPost.description = description;
      existPost.likes = likes;
      existPost.status = 'pending';

      await existPost.save();
      return res.status(200).send({ message: "Edited post successfully saved. Please wait for admin to approve it." })
    }
  } catch (error) {
    console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    return res.status(400).send({ message: "Invalid data format." })
  }
});

router.delete("post", authMiddleware, async (req, res) => {
  const { postId } = req.body;

  const existPost = await FoodPosts.findById(postId).exec();

  if (!existPost) {
    return res.status(400).send({ message: 'Post not found.' });
  }

  await existPost.delete();
  return res.status(200).send({ message: "Post successfully deleted." })
});

module.exports = router;