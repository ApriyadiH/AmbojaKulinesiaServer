const express = require("express");
const FoodPosts = require("../schemas/foodPosts");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/user/request', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const userId = user._id;

    const userRequests = await FoodPosts.find({ userId }).exec();
    
    if (userRequests.length < 1) {
        return res.status(400).send({ message: 'Request not found.' });
    }

    const result = userRequests.map(request => ({
        postId: request._id,
        foodName: request.foodName,
        region: request.region,
        imageUrls: request.imageUrls,
        description: request.description,
        status: request.status,
        createdAt: request.createdAt
    }))

    result.sort((a, b) => {
        const date1 = a.createdAt;
        const date2 = b.createdAt;
        if (date1 < date2) {
            return 1
        } else if (date1 > date2) {
            return -1
        } else {
            return 1
        }
    });

    return res.status(200).send({ data: result });
});

module.exports = router;