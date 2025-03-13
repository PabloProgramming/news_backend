const express = require("express");
const {deleteCommentById} = require("../controllers/commentControllers");

const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById);

module.exports = commentsRouter;

