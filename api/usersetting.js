const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const authMiddleware = require("../middlewares/authMiddleware");

// GET user's settings
router.get('/user/request', authMiddleware, async (req, res) => {
  const userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.send(user.settings);
  });
});

// UPDATE user's settings
router.patch('/user/request', authMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const updatedSettings = req.body;
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);
      const updatedUser = { ...user, ...updatedSettings };
      User.findByIdAndUpdate(userId, updatedUser, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedUser);
      });
    });
  });

module.exports = router;
