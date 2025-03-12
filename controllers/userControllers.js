const {selectAllUsers} = require("../models/userModels")

const getAllUsers = async (req, res) => {
    const users = await selectAllUsers();
    res.status(200).send({users})
}

module.exports = {getAllUsers}