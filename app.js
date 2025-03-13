const express = require("express");
const apiRouter = require("./routers/apiRouter");
const topicsRouter = require("./routers/topicsRouter");
const usersRouter = require("./routers/usersRouter");
const articlesRouter = require("./routers/articlesRouter");
const commentsRouter = require("./routers/commentsRouter")

const {
  handleServerError,
  handleInvalidPath,
  handleCustomError,
  handlePsqlErrors,
} = require("./controllers/errorControllers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/users", usersRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/comments", commentsRouter)

app.use(handleCustomError);
app.use(handlePsqlErrors);
app.use(handleServerError);
app.use(handleInvalidPath);

module.exports = app;
