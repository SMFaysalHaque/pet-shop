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

module.exports = { hashPassword };
