const db = require("../db/connection");

const selectAllTopics = async () => {
  const {rows} = await db.query(`SELECT * FROM topics`);
  return rows;
};

module.exports = {selectAllTopics};

