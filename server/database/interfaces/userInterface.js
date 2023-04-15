const { User } = require("../models/user");

const insertUser = async (userObject) => {
  try {
    const user = new User(userObject);
    const data = await user.save();
    if (data.nInserted === 0) {
      console.log("User insertion failed", e);
      return {
        status: "ERROR",
        message: "User insertion failed",
      };
    } else {
      return {
        data,
        status: "OK",
        message: "User insertion successful",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    throw new Error();
  }
};

const findUserByQuery = async (query, option) => {
  try {
    const data = await User.findOne(query, option);

    if (data) {
      return {
        data,
        message: "User found",
      };
    } else {
      return {
        data: null,
        message: "User not found",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    throw new Error();
  }
};

module.exports = {
  insertUser,
  findUserByQuery,
};
