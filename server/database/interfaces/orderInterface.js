const { Order } = require("../models/order");

const findOrdersByQuery = async (query, option) => {
  try {
    const data = (await Order.find(query, option)) ?? null;
    const message = data.length > 0 ? `${data.length} orders found` : "No order found";
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

const insertOrder = async (orderObject) => {
  try {
    const order = new Order(orderObject);
    const data = await order.save();
    if (data.nInserted === 0) {
      return {
        status: "ERROR",
        message: "Order insertion failed",
      };
    } else {
      return {
        data,
        status: "OK",
        message: "Order insertion successful",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    return {
      status: "EXCEPTION",
      message: "Order insertion failed",
    };
  }
};

module.exports = {
  findOrdersByQuery,
  insertOrder,
};
