const {
  selectCommentsByArticleId,
  insertCommentByArticleId,
  removeCommentById,
  selectCommentById,
  updateCommentVotesById
} = require("../models/commentModels");

const getCommentsByArticleId = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const {sort_by, order} = req.query;
    const comments = await selectCommentsByArticleId(
      article_id,
      sort_by,
      order
    );
    res.status(200).send({comments});
  } catch (err) {
    next(err);
  }
};

const postCommentByArticleId = async (req, res, next) => {
  try {
    const {article_id} = req.params;
    const {username, body} = req.body;
    const newComment = await insertCommentByArticleId(
      article_id,
      username,
      body
    );
    res.status(201).send({newComment});
  } catch (err) {
    next(err);
  }
};

const deleteCommentById = async (req, res, next) => {
  try {
    const {comment_id} = req.params;
    await removeCommentById(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const comment = await selectCommentById(comment_id);
    res.status(200).send({ comment })
  } catch (err) {
    next(err)
  }
};

const patchCommentVotesById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
    const updatedComment = await updateCommentVotesById(comment_id, inc_votes);
    res.status(200).send({ updatedComment })
  } catch (err) {
    next(err)
  }
};

module.exports = {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
  patchCommentVotesById,
  getCommentById,
};

