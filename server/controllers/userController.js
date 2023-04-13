import { hash } from "bcryptjs";

import { sendVerificationMail } from "../util/mailer";
import { generateRandomString } from "../util/common";
import { findUserByQuery, insertUser } from "../database/interfaces/userInterface";
import { insertToken } from "../database/interfaces/tokenInterface";

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, presentAddress } = req.body;
    validateRegisterUserPayload(firstName, lastName, email, password);
    // stop registration if email is already registered and verified
    if (isEmailVerified(email)) {
      return res.status(400).send({
        message: "User already registered",
      });
    }
    // hash password
    let hashedPassword;
    hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        hashedPassword = hash;
      }
    });

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
    idOfInsertedUser = userInsertionResult.data._userId;
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

export default {
  registerUser,
};
