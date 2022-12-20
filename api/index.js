const signupRouter = require("./register");
const loginRouter = require("./login");
const foodsRouter = require("./foodPosts");
const userRouter = require("./user");
const adminRouter = require("./admin");

module.exports = [
    signupRouter,
    loginRouter,
    foodsRouter,
    userRouter,
    adminRouter
];
