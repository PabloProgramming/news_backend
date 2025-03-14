const {selectAllTopics, insertTopic} = require("../models/topicModels");

const getAllTopics = async (req, res, next) => {
  try {
    const topics = await selectAllTopics();
    res.status(200).send({topics});
  } catch (err) {
    next(err);
  }
};

const postTopic = async (req, res, next) => {
  try {
    const {slug, description, img_url} = req.body;
    const newTopic = await insertTopic(slug, description, img_url);
    res.status(201).send({newTopic});
  } catch (err) {
    next(err);
  }
};

module.exports = {getAllTopics, postTopic};
