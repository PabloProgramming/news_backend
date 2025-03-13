const express = require("express");
const {
  deleteCommentById,
  patchCommentVotesById,
  getCommentById,
} = require("../controllers/commentControllers");

const commentsRouter = express.Router();

commentsRouter
  .route("/:comment_id")
  .get(getCommentById)
  .delete(deleteCommentById)
  .patch(patchCommentVotesById);

module.exports = commentsRouter;

