const { mailer } = require("../util/mailer");
const { isEmpty, isNumeric } = require("../util/common");
const { findUserByQuery } = require("../database/interfaces/userInterface");
const { insertOrder, findOrdersByQuery } = require("../database/interfaces/orderInterface");
const { findProductById } = require("../database/interfaces/productInterface");

const registerOrder = async (req, res) => {
  try {
    const { order } = req.body;
    sanitizedOrder = validateOrderPayload(order);

    const userQueryResult = await findUser(req.userData.email);
    if (!userQueryResult) {
      return res.status(400).send({
        message: "Cannot find user. Contact admin.",
      });
    }

    const orderObject = {
      userEmail: req.userData.email,
      order: sanitizedOrder,
    };

    const orderInsertionResult = await insertOrder(orderObject);
    const productsInOrder = await findProductsInOrder(sanitizedOrder);
    const productsInfo = productsInOrder.map((product, i) => {
      return `
      <p>No. ${i + 1}</p>
      <p>Product name: ${product.productData.name}</p>
      <p>Product category: ${product.productData.category}</p>
      <p>Order count: ${product.orderCount}</p>
      <br />
      `;
    });
    if (orderInsertionResult.status === "OK") {
      const content = `
        <p>New order has been placed by ${req.userData.email}</p>
        <p>Order details</p>
        <br />
        <p>${productsInfo.join("")}</p>
        <br />
        <p>This email is auto generated. Do not reply to this email.</p>
      `;
      await mailer(content);
      return res.status(200).send({
        message: orderInsertionResult.message,
      });
    } else {
      return res.status(400).send({
        message: orderInsertionResult.message,
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(e.errorCode ?? 500).send({
      message: e.message ?? "Internal Server Error",
    });
  }
};

function validateOrderPayload(order) {
  if (!order || order.length === 0) {
    error = new Error("Order data missing");
    error.errorCode = 400;
    throw error;
  }
  const productIds = [];
  const sanitizedOrder = order.map((product) => {
    if (isEmpty(product) || !product.id || !product.quantity || !isNumeric(product.quantity) || product.quantity <= 0) {
      error = new Error("Malformed request. Incorrect product data in Order.");
      error.errorCode = 400;
      throw error;
    }
    if (productIds.includes(product.id)) {
      error = new Error("Malformed request. Same product included multiple times.");
      error.errorCode = 400;
      throw error;
    } else {
      productIds.push(product.id);
    }
    return {
      productId: product.id,
      quantity: product.quantity,
    };
  });
  return sanitizedOrder;
}

async function findUser(email) {
  const queryData = { email: email };
  const userQueryResult = await findUserByQuery(queryData, {});
  return userQueryResult.data;
}

async function findProductsInOrder(order) {
  const result = await Promise.all(
    order.map(async (product) => {
      const productQueryResult = await findProductById(product.productId);
      if (!productQueryResult.data) {
        error = new Error("Invalid ProdcutId found. Contact admin.");
        error.errorCode = 400;
        throw error;
      }
      return {
        productData: productQueryResult.data,
        orderCount: product.quantity,
      };
    })
  );
  return result;
}

const getOrders = async (req, res) => {
  const orderQueryResult = await findOrdersByQuery({});

  let statusCode = 200;
  let message = orderQueryResult.message;
  if (orderQueryResult.status === "EXCEPTION") {
    statusCode = 500;
    message = "Internal Server Error";
  }

  return res.status(statusCode).send({
    data: orderQueryResult.data,
    message: message,
  });
};

module.exports = {
  registerOrder,
  getOrders,
};
