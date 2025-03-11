const handleCustomError = (err, req, res, next) => {
 console.log(err.msg)
  if (err.status && err.msg) {
     res.status(err.status).send({msg: err.msg});
  }
  next(err);
};

const handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({msg: "Bad Request"});
  }
  next(err);
};

const handleServerError = (err, req, res, next) => {
  res.status(500).send({msg: "Internal Server Error"});
};

const handleInvalidPath = (req, res) => {
  res.status(404).send({msg: "Path does not exist"});
};

module.exports = {
  handleServerError,
  handleInvalidPath,
  handleCustomError,
  handlePsqlErrors,
};


