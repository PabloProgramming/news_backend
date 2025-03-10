const express = require("express");
const getApiEndpoints = require("./controllers/apiController");
const getAllTopics = require("./controllers/topicControllers");
const getArticleById = require("./controllers/articleControllers");
const {
  handleServerError,
  handleInvalidPath,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errorControllers");

const app = express();

app.get("/api", getApiEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);

app.use(handleCustomError);

app.use(handlePsqlErrors);

app.use(handleServerError);

app.use(handleInvalidPath);

module.exports = app;

