const { Product } = require("../models/product");

const findProductsByQuery = async (query, option) => {
  try {
    const data = (await Product.find(query, option)) ?? null;
    const message = data.length > 0 ? `${data.length} product(s) found` : "No product found";
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

const findProductById = async (id) => {
  try {
    const data = (await Product.findById(id)) ?? null;
    const message = data ? "Product found" : "Product not found";
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
  findProductsByQuery,
  findProductById,
};
