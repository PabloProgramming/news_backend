const {use} = require("../app");
const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
} = require("../models/commentModels");

const getCommentsByArticleId = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const {sort_by, order} = req.query;
    const comments = await selectCommentsByArticleId(
      article_id,
      sort_by,
      order
    );
    res.status(200).send({comments});
  } catch (err) {
    next(err);
  }
};

const postCommentByArticleId = async (req, res) => {
  const {article_id} = req.params;
  const {username, body} = req.body;
  const newComment = await insertCommentByArticleId(article_id, username, body);
  console.log(newComment, "<<<<<")
  res.status(201).send({newComment});
};

module.exports = {getCommentsByArticleId, postCommentByArticleId};

