const foodsRouter = require("./foodPosts");
const userRouter = require("./user");
const adminRouter = require("./admin");

module.exports = [
    foodsRouter,
    userRouter,
    adminRouter
];
