const express = require("express");
const getApiEndpoints = require("./controllers/apiController");
const getAllTopics = require("./controllers/topicControllers");
const { handleServerError, handleInvalidPath } = require("./controllers/errorControllers")

const app = express();

app.get("/api", getApiEndpoints);

app.get("/api/topics", getAllTopics);

app.use(handleServerError);

app.use(handleInvalidPath);

module.exports = app;




