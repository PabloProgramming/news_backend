const {query} = require("express");
const db = require("../db/connection");
const {selectTopicBySlug} = require("./topicModels");

const allowedSortingQueries = [
  "article_id",
  "created_at",
  "title",
  "topic",
  "author",
  "votes",
];
const allowedOrderQueries = ["desc", "asc"];

const selectAllArticles = async (
  sort_by = "created_at",
  order = "desc",
  topic
) => {
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
  CAST(COUNT(c.comment_id) AS integer) AS comment_count
  FROM articles a
  LEFT JOIN comments c ON a.article_id = c.article_id`;

  let queryValues = [];

  if (topic) {
    await selectTopicBySlug(topic);
    queryStr += ` WHERE a.topic = $1`;
    queryValues.push(topic);
  }

  queryStr += ` GROUP BY 
  a.article_id`;

  if (sort_by) {
    queryStr += ` ORDER BY ${sort_by}`;
  }
  if (order) {
    queryStr += ` ${order}`;
  }

  const {rows} = await db.query(queryStr, queryValues);
  const articles = rows;
  if (articles.length === 0) {
    return {articles: [], msg: "No articles found for this topic"};
  }
  return articles;
};

const selectArticleById = async (article_id) => {
  const {rows} = await db.query(
    `SELECT a.author, a.title, a.article_id, a.topic, a.created_at, a.votes, a.article_img_url, a.body,
    CAST(COUNT(c.comment_id) AS integer) AS comment_count
     FROM articles a
     LEFT JOIN comments c ON a.article_id = c.article_id
     WHERE a.article_id = $1
     GROUP BY a.article_id`,
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
  const queryStr = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`;
  const {rows} = await db.query(queryStr, [inc_votes, article_id]);
  const updatedArticle = rows[0];
  return updatedArticle;
};

const insertArticle = async (
  author,
  title,
  body,
  topic,
  article_img_url = "https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg?w=700&h=700"
) => {
  const queryStr = `INSERT INTO articles (author, title, body, topic, article_img_url)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *, 
                    (SELECT CAST(COUNT(c.comment_id) AS integer) 
                    FROM comments c 
                    WHERE c.article_id = articles.article_id) AS comment_count;`;
  const bodyValues = [author, title, body, topic, article_img_url];
  const {rows} = await db.query(queryStr, bodyValues);
  return rows[0];
};

module.exports = {
  selectArticleById,
  selectAllArticles,
  updateArticleById,
  insertArticle,
};



