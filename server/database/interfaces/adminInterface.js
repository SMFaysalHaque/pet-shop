const { Admin } = require("../models/admin");

const findAdminByQuery = async (query, option) => {
  try {
    const data = await Admin.findOne(query, option);

    if (data) {
      return {
        data,
        message: "Admin found",
      };
    } else {
      return {
        data: null,
        message: "Admin not found",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    return {
      data: null,
      message: e.message,
      status: "EXCEPTION",
    };
  }
};

module.exports = {
  findAdminByQuery,
};
