const express = require("express");
const { getAllTopics, postTopic } = require("../controllers/topicControllers");

const topicsRouter = express.Router();

topicsRouter.route("/").get(getAllTopics).post(postTopic);

module.exports = topicsRouter;

