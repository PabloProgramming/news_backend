const db = require("../db/connection");

const allowedSortingQueries = [
  "article_id",
  "created_at",
  "title",
  "topic",
  "author",
  "votes",
  "article_img_url",
];
const allowedOrderQueries = ["desc", "asc"];

const selectAllArticles = async (sort_by = "created_at", order = "desc") => {
  if (!allowedSortingQueries.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }

  if (!allowedOrderQueries.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }

  let queryStr = `SELECT a.author, a.title, a.article_id, a.topic, a.created_at,a.votes, a.article_img_url,
  COUNT(c.comment_id) AS comment_count
  FROM articles a
  LEFT JOIN comments c ON a.article_id = c.article_id
  GROUP BY 
  a.article_id`;

  if (sort_by) {
    queryStr += ` ORDER BY ${sort_by}`;
  }
  if (order) {
    queryStr += ` ${order}`;
  }

  const {rows} = await db.query(queryStr);
  const articles = rows;
  return articles;
};

const selectArticleById = async (article_id) => {
  const {rows} = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );
  const article = rows[0];
  if (!article) {
    return Promise.reject({
      status: 404,
      msg: "Article not found",
    });
  }
  return article;
};

const updateArticleById = async (article_id, inc_votes) => {
  await selectArticleById(article_id);
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }
  let queryStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`;
  const {rows} = await db.query(queryStr, [inc_votes, article_id]);
  const updatedArticle = rows[0];
  return updatedArticle;
};

module.exports = {selectArticleById, selectAllArticles, updateArticleById};

