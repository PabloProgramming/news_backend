const {
  selectArticleById,
  selectAllArticles,
  updateArticleById,
} = require("../models/articleModels");

const getAllArticles = async (req, res, next) => {
  try {
    const {sort_by, order} = req.query;
    const articles = await selectAllArticles(sort_by, order);
    res.status(200).send({articles});
  } catch (err) {
    next(err);
  }
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

const patchArticleById = async (req, res) => {
  const {article_id} = req.params;
  const {inc_votes} = req.body;
  const updatedArticle = await updateArticleById(article_id, inc_votes);
  res.status(200).send({updatedArticle});
};

module.exports = {getArticleById, getAllArticles, patchArticleById};

