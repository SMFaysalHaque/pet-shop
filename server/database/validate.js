const { Error } = require("mongoose");
const urlRegexSafe = require("url-regex-safe");
const { isEmail, isMobilePhone } = require("validator");

const validateURL = (url) => {
  if (url === "") return;
  if (!urlRegexSafe({ exact: true }).test(url)) {
    throw new Error("Invalid Url");
  }
};

const validateEmail = (email) => {
  if (!isEmail(email)) {
    throw new Error("Invalid Email");
  }
};

const validatePhone = (phone) => {
  if (!isMobilePhone(phone)) {
    throw new Error("Invalid Phone Number");
  }
};

const validateMinMax = (object) => {
  if (object.min > object.max) {
    throw new Error("Invalid Min Max Value");
  }
};

module.exports = {
  validateEmail,
  validatePhone,
  validateURL,
  validateMinMax,
};
