const db = require("../db/connection");

const selectAllTopics = async () => {
  const {rows} = await db.query(`SELECT * FROM topics`);
  return rows;
};

const selectTopicBySlug = async (topic) => {
  const queryStr = `SELECT * FROM topics WHERE slug = $1`;

  const {rows} = await db.query(queryStr, [topic]);
  if (!rows[0]) {
    return Promise.reject({
      status: 404,
      msg: "Topic not found",
    });
  }
  return rows[0];
};

module.exports = {selectAllTopics, selectTopicBySlug};

