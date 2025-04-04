const express = require("express");
const {
  getArticleById,
  getAllArticles,
  patchArticleById,
  postArticle,
  deleteArticleById,
  getArticleByTitle,
} = require("../controllers/articleControllers");

const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/commentControllers");

const articlesRouter = express.Router();

articlesRouter.route("/").get(getAllArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

  articlesRouter.route("/title/:title").get(getArticleByTitle)

module.exports = articlesRouter;

