const {
  selectArticleById,
  selectAllArticles,
  updateArticleById,
  insertArticle,
} = require("../models/articleModels");

const getAllArticles = async (req, res, next) => {
  try {
    const {sort_by, order, topic, limit, p} = req.query;
    const {articles, total_count, pages, pageNumber} = await selectAllArticles(sort_by, order, topic,limit,p);
    res.status(200).send({articles, total_count, pages, pageNumber});
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

const patchArticleById = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const {inc_votes} = req.body;
    const updatedArticle = await updateArticleById(article_id, inc_votes);
    res.status(200).send({updatedArticle});
  } catch (err) {
    next(err);
  }
};

const postArticle = async (req, res, next) => {
  try {
    const {author, title, body, topic, article_img_url} = req.body;
    const newArticle = await insertArticle(
      author,
      title,
      body,
      topic,
      article_img_url
    );
    res.status(201).send({newArticle});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticleById,
  getAllArticles,
  patchArticleById,
  postArticle,
};

