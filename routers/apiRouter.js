const express = require("express");
const getApiEndpoints = require("../controllers/apiController");

const apiRouter = express.Router();

apiRouter.get("/", getApiEndpoints);

module.exports = apiRouter;
