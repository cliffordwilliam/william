// router maker
const express = require("express");
// my controller
const ScrapperController = require("../controllers/scrapperController.js");
// guard
const Middleware = require("../middleware.js");
// 3rd party api
const Utils = require("../utils.js");
// my router
const scrapperRouter = express.Router();

// endpoints
scrapperRouter.get("/amazon", ScrapperController.getAmazon);

// export
module.exports = scrapperRouter;
