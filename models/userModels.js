const db = require("../db/connection");

const selectUserByUsername = async (username) => {
  const {rows} = await db.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  const user = rows[0];
  if (!user) {
    return Promise.reject({
      status: 404,
      msg: "User not found",
    });
  }
  return user;
};

module.exports = {selectUserByUsername};
