const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const authMiddleware = require("../middlewares/authMiddleware");
const Joi = require("joi");
const bcrypt = require('bcryptjs');

// Read
router.get("/userlist", async (req, res) => {
    const fetchTest = await User.find();
  
    const results = fetchTest.map((content) => {
          return {
        userId: content.userId,
        username: content.username,
        password: content.password,
      };
    });
  
    res.json({
      data: results,
    });
  });
  
// UPDATE user's username
router.patch('/user/username', authMiddleware, async (req, res) => {
    const {username} = req.body;
    const { user } = res.locals;
    const userId = user._id;

    try {
        const existUser = await User.findById(userId).exec();

        existUser.username = username;
        await existUser.save();

        return res.status(200).send({ message: "Username changed." })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    }
  });

 // UPDATE user's username
router.patch('/user/password', authMiddleware, async (req, res) => {
    const {password} = req.body;
    const { user } = res.locals;
    const userId = user._id;

    try {
        const existUser = await User.findById(userId).exec();

        existUser.password = password;
        await existUser.save();

        return res.status(200).send({ message: "Password changed." })
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
    }
  });

module.exports = router;
