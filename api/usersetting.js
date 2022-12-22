const express = require('express');
const router = express.Router();
const User = require('../schemas/users');
const authMiddleware = require("../middlewares/authMiddleware");

// UPDATE user's username
router.patch('/user/username', authMiddleware, async (req, res) => {
    const username = req.body;
    
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send(err);
      const updatedUser = { ...user, ...updatedSettings };
      User.findByIdAndUpdate(userId, updatedUser, (err, user) => {
        if (err) return res.status(500).send(err);
        return res.send(updatedUser);
      });
    });
  });

  // UPDATE user's password
router.patch('/user/password', authMiddleware, async (req, res) => {
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
