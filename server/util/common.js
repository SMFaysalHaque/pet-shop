const { hash } = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const isNumeric = (num) => {
  return (typeof num === "number" || (typeof num === "string" && num.trim() !== "")) && !isNaN(num);
};

module.exports = { hashPassword, isNumeric };
