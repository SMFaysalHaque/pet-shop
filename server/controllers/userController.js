const { sendVerificationMail } = require("../util/mailer");
const { generateRandomString, hashPassword } = require("../util/common");
const { findUserByQuery, insertUser } = require("../database/interfaces/userInterface");
const { insertToken } = require("../database/interfaces/tokenInterface");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, presentAddress } = req.body;
    validateRegisterUserPayload(firstName, lastName, email, password);
    // stop registration if email is already registered and verified
    if (await isEmailVerified(email)) {
      return res.status(400).send({
        message: "User already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      ...(phone ? { phone } : {}),
      ...(presentAddress ? { presentAddress } : {}),
    };

    const userInsertionResult = await insertUser(user);
    if (userInsertionResult.status === "ERROR") {
      return res.status(400).send({
        message: "User registration failed.",
      });
    }
    const verificationToken = generateRandomString(64);
    try {
      sendVerificationMail(email, verificationToken);
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        message: "Verification mail sending failed. Try again later.",
      });
    }
    idOfInsertedUser = userInsertionResult.data._id;
    const token = {
      _userId: idOfInsertedUser,
      token: verificationToken,
    };
    const tokenInsertionResult = await insertToken(token);
    if (tokenInsertionResult.status === "OK") {
      return res.status(200).send({
        message: "User registration request has been submitted. Check email for verification link.",
      });
    } else {
      return res.status(400).send({
        message: "User registration failed.",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

function validateRegisterUserPayload(firstName, lastName, email, password) {
  if (!firstName || !lastName || !email || !password) {
    error = new Error("Input Field missing");
    error.errorCode = 400;
    throw error;
  }

  return;
}

async function isEmailVerified(email) {
  const queryData = { email: email };
  const userQueryResult = await findUserByQuery(queryData, {});
  return userQueryResult.data?.isVerified;
}

module.exports = {
  registerUser,
};
