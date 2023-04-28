module.exports = (req, res, next) => {
  if (req.userData.admin !== true) {
    return res.status(401).json({
      message: "Admin authentication failed.",
    });
  }
  next();
};
