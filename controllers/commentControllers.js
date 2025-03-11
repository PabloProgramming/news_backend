const selectCommentsByArticleId = require("../models/commentModels");

const getCommentsByArticleId = async (req, res) => {
  const {article_id} = req.params;
  const {sort_by, order} = req.query;
  const comments = await selectCommentsByArticleId(article_id, sort_by, order);
  res.status(200).send({comments});
};

module.exports = getCommentsByArticleId;

