const {
  selectArticleById,
  selectAllArticles,
} = require("../models/articleModels");

const getAllArticles = async (req, res) => {
  const {sort_by, order} = req.query;
  const articles = await selectAllArticles(sort_by, order);
  res.status(200).send({articles});
};

const getArticleById = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const article = await selectArticleById(article_id);
    res.status(200).send({article});
  } catch (err) {
    next(err);
  }
};

module.exports = {getArticleById, getAllArticles};

