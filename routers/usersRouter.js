const express = require("express");
const {getAllUsers, getUserByUserName} = require("../controllers/userControllers");

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);

usersRouter.route("/:username").get(getUserByUserName)

module.exports = usersRouter;

