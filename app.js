const express = require("express");
const getApiEndpoints = require("./controllers/apiController");
const getAllTopics = require("./controllers/topicControllers");

const app = express();

app.get("/api", getApiEndpoints);

app.get("/api/topics", getAllTopics);

module.exports = app;
