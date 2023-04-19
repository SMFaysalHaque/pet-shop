const { Category } = require("../models/category");

const findCategoriesByQuery = async (query, option) => {
  try {
    const data = (await Category.find(query, option)) ?? null;
    const message = data.length > 0 ? `${data.length} categories found` : "No category found";
    return {
      data,
      message,
    };
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
  findCategoriesByQuery,
};
