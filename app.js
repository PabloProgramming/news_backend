const express = require("express");
const getApiEndpoints = require("./controllers/apiController");
const getAllTopics = require("./controllers/topicControllers");
const {
  getArticleById,
  getAllArticles,
  patchArticleById,
} = require("./controllers/articleControllers");
const {
  handleServerError,
  handleInvalidPath,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errorControllers");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/commentControllers");

const app = express();

app.use(express.json());

app.get("/api", getApiEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticleById);
app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.use(handleCustomError);

app.use(handlePsqlErrors);

app.use(handleServerError);

app.use(handleInvalidPath);

module.exports = app;

