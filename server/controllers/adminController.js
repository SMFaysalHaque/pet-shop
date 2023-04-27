const jwt = require("jsonwebtoken");

const { findAdminByQuery } = require("../database/interfaces/adminInterface");

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).send({
        message: "Input Field error",
      });
    }

    const queryData = { email: email };
    const adminQueryResult = await findAdminByQuery(queryData, {});
    const admin = adminQueryResult.data;
    if (!admin) {
      return res.status(404).send({
        message: "Admin not found.",
      });
    }

    if (password !== admin.password) {
      return res.status(401).json({
        message: "Authentication failed. Please check email and password and try again.",
      });
    }
    const adminInfo = {
      email: admin.email,
      name: admin.name,
      admin: true,
    };
    const token = jwt.sign(adminInfo, process.env.JWT_KEY, {
      expiresIn: parseInt(process.env.TOKEN_LIFE),
    });
    return res.status(200).json({
      message: "Authentication successful",
      token: token,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
};
