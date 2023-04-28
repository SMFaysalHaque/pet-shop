const { findProductById, findProductsByQuery, insertProduct } = require("../database/interfaces/productInterface");
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

const createProduct = async (req, res) => {
  try {
    const { name, description, price, inventory, imageUrl, category } = req.body;
    if (!name || !description || !price || !inventory) {
      return res.status(400).send({
        message: "Input Field error",
      });
    }

    const product = {
      name,
      description,
      price,
      inventory,
      ...(imageUrl ? { imageUrl } : {}),
      ...(category ? { category } : {}),
    };

    const productInsertionResult = await insertProduct(product);
    if (productInsertionResult.status === "OK") {
      return res.status(200).send({
        message: "Product insertion successful.",
      });
    } else {
      return res.status(400).send({
        message: "Product insertion failed.",
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

module.exports = { getProducts, getProduct, getCategories, getProductsOfSpecificCategory, createProduct };
