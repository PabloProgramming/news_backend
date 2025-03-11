const selectCommentsByArticleId = require("../models/commentModels");

const getCommentsByArticleId = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { sort_by, order } = req.query;
    const comments = await selectCommentsByArticleId(article_id, sort_by, order);
    res.status(200).send({ comments });
  } catch (err) {
    next(err)
  }
}

module.exports = getCommentsByArticleId;

