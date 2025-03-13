const { selectAllUsers, selectUserByUsername } = require("../models/userModels");

const getAllUsers = async (req, res) => {
  const users = await selectAllUsers();
  res.status(200).send({users});
};

const getUserByUserName = async (req, res, next) => {
    try {
        const { username } = req.params;
        if (typeof username !== "string" || !isNaN(username)) {
          return res.status(400).send({msg: "Bad Request"});
        }
        const user = await selectUserByUsername(username);
        res.status(200).send({ user })
    } catch (err) {
        next(err)
    }
};

module.exports = {getAllUsers, getUserByUserName};

