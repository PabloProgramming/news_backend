const handleCustomError = (err, req, res, next) => {
  console.log(err, "controler")
  if (err.status && err.msg) {
    res.status(err.status).send({msg: err.msg});
  }
  next(err);
};

const handleServerError = (err, req, res, next) => {
  res.status(500).send({msg: "Internal Server Error"});
};

const handleInvalidPath = (req, res) => {
  res.status(404).send({msg: "Path does not exist"});
};

module.exports = {handleServerError, handleInvalidPath, handleCustomError};


