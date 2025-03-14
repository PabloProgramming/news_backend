const {
  selectArticleById,
  selectAllArticles,
  updateArticleById,
  insertArticle,
} = require("../models/articleModels");

const getAllArticles = async (req, res, next) => {
  try {
    const {sort_by, order, topic} = req.query;
    const articles = await selectAllArticles(sort_by, order, topic);
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

const postArticle = async (req, res) => {
  const {author, title, body, topic, article_img_url} = req.body;
  const newArticle = await insertArticle(
    author,
    title,
    body,
    topic,
    article_img_url
  );
  console.log(newArticle.created_at, "<<<<<<<<<<")
  res.status(201).send({newArticle})
};

module.exports = {
  getArticleById,
  getAllArticles,
  patchArticleById,
  postArticle,
};


