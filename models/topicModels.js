const db = require("../db/connection");

const selectAllTopics = async (req, res) => {
  const {rows} = await db.query(`SELECT * FROM topics`);
  return rows;
};

module.exports = {selectAllTopics};
