const {selectAllTopics} = require("../models/topicModels");

const getAllTopics = async (req, res, next) => {
  try {
    const topics = await selectAllTopics();
    res.status(200).send({topics});
  } catch (err) {
    next(err);
  }
};

module.exports = getAllTopics;