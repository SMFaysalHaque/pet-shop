const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { hashPassword } = require("../util/common");
const { findUserByQuery, insertUser } = require("../database/interfaces/userInterface");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, presentAddress } = req.body;
    validateRegisterUserPayload(firstName, lastName, email, password);
    // stop registration if email is already registered
    const userQueryResult = await findUser(email);
    if (!!userQueryResult) {
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
    if (userInsertionResult.status === "OK") {
      return res.status(200).send({
        message: "User registration successful.",
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

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).send({
        message: "Input Field error",
      });
    }

    const userQueryResult = await findUser(email);
    if (!userQueryResult) {
      return res.status(404).send({
        message: "User not found.",
      });
    }
    const user = userQueryResult;

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Authentication failed. Please check email and password and try again.",
        });
      }
      if (result) {
        const userInfo = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          ...(user.phone ? { phone: user.phone } : {}),
          ...(user.presentAddress ? { presentAddress: user.presentAddress } : {}),
        };
        const token = jwt.sign(userInfo, process.env.JWT_KEY, {
          expiresIn: parseInt(process.env.TOKEN_LIFE),
        });

        return res.status(200).json({
          message: "Authentication successful",
          token: token,
        });
      }
      res.status(401).json({
        message: "Authentication failed. Please check email and password and try again.",
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: "Internal Server Error",
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

async function findUser(email) {
  const queryData = { email: email };
  const userQueryResult = await findUserByQuery(queryData, {});
  return userQueryResult.data;
}

module.exports = {
  registerUser,
  login,
};
