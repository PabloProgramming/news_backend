const db = require("../db/connection");

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

module.exports = selectCommentsByArticleId;





