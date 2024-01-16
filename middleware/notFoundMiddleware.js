const notFoundMiddleware = (req, res, next) => {
  return res.status(404).send("Page not found");
};

module.exports = notFoundMiddleware;
