const handleServerError = (err, req, res, next) => {
  res.status(500).send({msg: "Internal Server Error"});
};

const handleInvalidPath = (req, res) => {
  console.log("Invalid Path:", req.originalUrl);
  res.status(404).send({msg: "Path does not exist"});
};

module.exports = {handleServerError, handleInvalidPath};

