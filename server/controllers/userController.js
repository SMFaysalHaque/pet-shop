const { hashPassword } = require("../util/common");
const { findUserByQuery, insertUser } = require("../database/interfaces/userInterface");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, presentAddress } = req.body;
    validateRegisterUserPayload(firstName, lastName, email, password);
    // stop registration if email is already registered
    if (await isEmailRegistered(email)) {
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

function validateRegisterUserPayload(firstName, lastName, email, password) {
  if (!firstName || !lastName || !email || !password) {
    error = new Error("Input Field missing");
    error.errorCode = 400;
    throw error;
  }

  return;
}

async function isEmailRegistered(email) {
  const queryData = { email: email };
  const userQueryResult = await findUserByQuery(queryData, {});
  return !!userQueryResult.data;
}

module.exports = {
  registerUser,
};
