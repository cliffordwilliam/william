// router maker
const express = require("express");
// guard
const Middleware = require("../middleware.js");
// bypass branch controller
const UserController = require("../controllers/userController");
// my router
const homeRouter = express.Router();
// child
const userRouter = require("./userRouter.js");
const scrapperRouter = require("./scrapperRouter.js");

// free
homeRouter.post("/user", UserController.post);
homeRouter.post("/user/login", UserController.login);
// token
homeRouter.use(Middleware.tokenGuard);
homeRouter.use("/user", userRouter);
homeRouter.use("/scrapper", scrapperRouter);

// export
module.exports = homeRouter;
