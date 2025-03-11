const db = require("../db/connection");

const allowedSortingQueries = ["created_at"];
const allowedOrderQueries = ["desc", "asc"];

const selectCommentsByArticleId = async (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
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
  return comments;
};

module.exports = selectCommentsByArticleId;

