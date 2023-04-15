const { Token } = require("../models/token");

const insertToken = async (tokenObject) => {
  try {
    const token = new Token(tokenObject);
    const data = await token.save();
    if (data.nInserted === 0) {
      console.log("Token insertion failed", e);
      return {
        status: "ERROR",
        message: "Token insertion failed",
      };
    } else {
      return {
        status: "OK",
        message: "Token insertion successful",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    throw new Error();
  }
};

module.exports = {
  insertToken,
};
