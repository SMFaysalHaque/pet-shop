import { Error } from "mongoose";
import urlRegexSafe from "url-regex-safe";
import { isEmail, validatePhone } from "validator";

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
        throw new Error('Invalid Min Max Value');
    }
}

export default {
  validateEmail,
  validatePhone,
  validateURL,
  validateMinMax,
};
