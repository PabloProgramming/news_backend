const express = require("express");
const getApiEndpoints = require("./controllers/apiController");

const app = express();

app.get("/api", getApiEndpoints);

module.exports = app