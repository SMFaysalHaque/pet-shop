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

const checkCategoryExists = async (query, option) => {
  try {
    const data = await Category.find(query, option);
    const message = data.length > 0 ? "Category exists." : "Category does not exist.";
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

const insertCategory = async (categoryObject) => {
  try {
    const category = new Category(categoryObject);
    const data = await category.save();
    if (data.nInserted === 0) {
      return {
        status: "ERROR",
        message: "Category insertion failed",
      };
    } else {
      return {
        data,
        status: "OK",
        message: "Category insertion successful",
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

const deleteCategory = async (category) => {
  try {
    const data = await Category.findOneAndDelete({ name: category });
    if (data) {
      return {
        data,
        message: "Category removed successfully.",
        status: "OK",
      };
    } else {
      return {
        message: "Could not remove Category.",
        status: "ERROR",
      };
    }
  } catch (e) {
    console.error("DB exception", e);
    return {
      message: e.message,
      status: "EXCEPTION",
    };
  }
};

module.exports = {
  findCategoriesByQuery,
  checkCategoryExists,
  insertCategory,
  deleteCategory,
};
