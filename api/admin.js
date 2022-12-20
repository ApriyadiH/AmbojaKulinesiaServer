const express = require("express");
const FoodPosts = require("../schemas/foodPosts");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/admin/post', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (!isAdmin) {
        return res.status(400).send({ message: "Only admin can view all of the posts."})
    }

    const postList = await FoodPosts.find({ status: 'approved' }).exec();

    if (!postList) {
        return res.status(400).send({ message: 'Post not found.' });
    }

    postList.sort((a, b) => { a.createdAt - b.createdAt });

    return res.status(200).send({ data: postList });
});

router.get('/admin/request', authMiddleware, async (req, res) => {
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (!isAdmin) {
        return res.status(400).send({ message: "Only admin can view pending user requests."})
    }

    const pendingRequest = await FoodPosts.find({ status: 'pending' }).exec();

    if (!pendingRequest) {
        return res.status(400).send({ message: 'There is no pending request.' });
    }

    pendingRequest.sort((a, b) => { a.createdAt - b.createdAt });

    return res.status(200).send({ data: pendingRequest });
});

router.patch('/admin/request/approve', authMiddleware, async (req, res) => {
    const { postId } = req.body;
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (!isAdmin) {
        return res.status(400).send({ message: "Only admin can approve this request." });
    }

    const existRequest = await FoodPosts.findById(postId).exec();

    if (!existRequest) {
        return res.status(400).send({ message: 'Request not found.' });
    }

    existRequest.status = 'approved';
    await existRequest.save();

    return res.status(200).send({ message: "Request approved." })
});

router.patch('/admin/request/reject', authMiddleware, async (req, res) => {
    const { postId } = req.body;
    const { user } = res.locals;
    const isAdmin = user.isAdmin;

    if (!isAdmin) {
        return res.status(400).send({ message: "Only admin can reject this request." });
    }

    const existRequest = await FoodPosts.findById(postId).exec();

    if (!existRequest) {
        return res.status(400).send({ message: 'Request not found.' });
    }

    existRequest.status = 'rejected';
    await existRequest.save();

    return res.status(200).send({ message: "Request rejected." })
});

module.exports = router;