const express = require("express");
const FoodPosts = require("../schemas/foodPosts");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/user/request', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const userId = user._id;

    const userRequests = await FoodPosts.find({ userId }).exec();
    
    if (!userRequests) {
        return res.status(400).send({ message: 'Request not found.' });
    }

    userRequests.sort((a, b) => { a.createdAt - b.createdAt });

    return res.status(200).send({ data: userRequests });
});

module.exports = router;