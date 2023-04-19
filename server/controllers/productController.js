const { findProductById, findProductsByQuery } = require("../database/interfaces/productInterface");
const { findCategoriesByQuery } = require("../database/interfaces/categoryInterface");

const getProducts = async (req, res) => {
  const productQueryResult = await findProductsByQuery({});

  let statusCode = 200;
  let message = productQueryResult.message;
  if (productQueryResult.status === "EXCEPTION") {
    statusCode = 500;
    message = "Internal Server Error";
  }

  return res.status(statusCode).send({
    data: productQueryResult.data,
    message: message,
  });
};

const getProduct = async (req, res) => {
  const productQueryResult = await findProductById(req.params.productId);

  let statusCode = 200;
  let message = productQueryResult.message;
  if (productQueryResult.status === "EXCEPTION") {
    statusCode = 500;
    message = "Internal Server Error";
  }

  return res.status(statusCode).send({
    data: productQueryResult.data,
    message: message,
  });
};

const getCategories = async (req, res) => {
  const categoryQueryResult = await findCategoriesByQuery({});

  let statusCode = 200;
  let message = categoryQueryResult.message;
  if (categoryQueryResult.status === "EXCEPTION") {
    statusCode = 500;
    message = "Internal Server Error";
  }

  return res.status(statusCode).send({
    data: categoryQueryResult.data,
    message: message,
  });
};

const getProductsOfSpecificCategory = async (req, res) => {
  queryData = { category: req.params.category };
  const productQueryResult = await findProductsByQuery(queryData);

  let statusCode = 200;
  let message = productQueryResult.message;
  if (productQueryResult.status === "EXCEPTION") {
    statusCode = 500;
    message = "Internal Server Error";
  }

  return res.status(statusCode).send({
    data: productQueryResult.data,
    message: message,
  });
};

module.exports = { getProducts, getProduct, getCategories, getProductsOfSpecificCategory };
