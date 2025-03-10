const {selectAllTopics} = require("../models/topicModels");

const getAllTopics = async (req, res) => {
  const topics = await selectAllTopics();
  res.status(200).send({topics});
};

module.exports = getAllTopics;
