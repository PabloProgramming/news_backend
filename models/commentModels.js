const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const {selectArticleById} = require("./articleModels");
const {selectUserByUsername} = require("./userModels");

const allowedSortingQueries = ["created_at"];
const allowedOrderQueries = ["desc", "asc"];

const selectCommentsByArticleId = async (
  article_id,
  sort_by = "created_at",
  order = "desc"
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

  let queryStr = `SELECT * FROM comments WHERE article_id = $1`;
  let queryParams = [];

  if (article_id) {
    queryParams.push(article_id);
  }

  if (sort_by) {
    queryStr += ` ORDER BY comments.${sort_by}`;
  }
  if (order) {
    queryStr += ` ${order}`;
  }

  const {rows} = await db.query(queryStr, queryParams);
  const comments = rows;
  if (comments.length === 0) {
    return Promise.reject({
      status: 404,
      msg: "Not Found",
    });
  }
  return comments;
};

const insertCommentByArticleId = async (article_id, username, body) => {
  await selectArticleById(article_id);

  await selectUserByUsername(username);

  const queryStr = `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *`;
  const {rows} = await db.query(queryStr, [article_id, username, body]);
  const newComment = rows[0];
  return newComment;
};

const selectCommentById = async (comment_id) => {
  const {rows} = await db.query(
    `SELECT * FROM comments WHERE comment_id = $1`,
    [comment_id]
  );
  const comment = rows[0];
  if (!comment) {
    return Promise.reject({
      status: 404,
      msg: "Comment not found",
    });
  }
  return comment;
};

const removeCommentById = async (comment_id) => {
  await selectCommentById(comment_id);

  const queryStr = `DELETE FROM comments WHERE comment_id = $1`;
  await db.query(queryStr, [comment_id]);
  //Not necesary to return anything
};

const updateCommentVotesById = async (comment_id, inc_votes) => {
  await selectCommentById(comment_id);
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }
  const queryStr = `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`;
  const {rows} = await db.query(queryStr, [inc_votes, comment_id]);
  return rows[0];
};

module.exports = {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentById,
  updateCommentVotesById,
  selectCommentById,
};



