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

const insertProduct = async (productObject) => {
  try {
    const product = new Product(productObject);
    const data = await product.save();
    if (data.nInserted === 0) {
      console.log("Product insertion failed", e);
      return {
        status: "ERROR",
        message: "Product insertion failed",
      };
    } else {
      return {
        data,
        status: "OK",
        message: "Product insertion successful",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    return {
      status: "EXCEPTION",
      message: e.message,
    };
  }
};

module.exports = {
  findProductsByQuery,
  findProductById,
  insertProduct,
};
