const {
  findProductById,
  findProductsByQuery,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require("../database/interfaces/productInterface");
const {
  findCategoriesByQuery,
  checkCategoryExists,
  insertCategory,
  deleteCategory,
} = require("../database/interfaces/categoryInterface");

const { isNumeric } = require("../util/common");

const getProducts = async (req, res) => {
  const { min, max } = req.query;
  let queryData;
  if (!min && !max) {
    queryData = {};
  } else if ((min && !max) || (max && !min) || !isNumeric(min) || !isNumeric(max) || min < 0 || max < 0) {
    return res.status(400).send({
      message: "Query string error. Check min and max value.",
    });
  }

  if (min && max) {
    queryData = { price: { $gte: min, $lte: max } };
  }
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

const handleUpdateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, inventory, imageUrl, category } = req.body;

    const productUpdatePayload = {
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(price ? { price } : {}),
      ...(inventory ? { inventory } : {}),
      ...(imageUrl ? { imageUrl } : {}),
      ...(category ? { category } : {}),
    };

    const productUpdateResult = await updateProduct(productId, productUpdatePayload);
    if (productUpdateResult.status === "OK") {
      return res.status(200).send({
        data: productUpdateResult.data,
        message: productUpdateResult.message,
      });
    } else {
      return res.status(400).send({
        message: productUpdateResult.message,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const productDeletionResult = await deleteProduct(productId);

    if (productDeletionResult.status !== "OK") {
      return res.status(400).send({
        message: productDeletionResult.message,
      });
    }

    return res.status(200).send({
      message: productDeletionResult.message,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl) {
      return res.status(400).send({
        message: "Input Field error",
      });
    }

    // check if category already exists
    const categoryExists = await checkCategoryExists({ name });
    if (categoryExists.data.length) {
      return res.status(400).send({
        message: categoryExists.message,
      });
    }

    const category = {
      name,
      imageUrl,
    };

    const categoryInsertionResult = await insertCategory(category);
    if (categoryInsertionResult.status === "OK") {
      return res.status(200).send({
        message: categoryInsertionResult.message,
      });
    } else {
      return res.status(400).send({
        message: categoryInsertionResult.message,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

const handleDeleteCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const categoryDeletionResult = await deleteCategory(category);

    if (categoryDeletionResult.status !== "OK") {
      return res.status(400).send({
        message: categoryDeletionResult.message,
      });
    }

    return res.status(200).send({
      message: categoryDeletionResult.message,
    });
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getCategories,
  getProductsOfSpecificCategory,
  createProduct,
  handleUpdateProduct,
  handleDeleteProduct,
  createCategory,
  handleDeleteCategory,
};
