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

const insertTopic = async (slug, description, img_url) => {
  if (!slug || !description) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Missing required fields",
    });
  }

  if (typeof slug !== "string" || typeof description !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Invalid data type",
    });
  }
  const queryStr = `INSERT INTO topics (slug, description, img_url) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await db.query(queryStr, [slug, description, img_url]);
  return rows[0];
};

module.exports = {selectAllTopics, selectTopicBySlug, insertTopic};



