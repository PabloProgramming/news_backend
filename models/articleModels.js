const db = require("../db/connection");

const selectArticleById = async (article_id) => {
  const {rows} = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [article_id]
  );
  const article = rows[0];
  if (!article) {
    return Promise.reject({
      status: 404,
      msg: "Not Found",
    });
  }
  return article;
};

module.exports = selectArticleById;

