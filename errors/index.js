const BadRequestError = require("./bad-request");
const CustomAPIError = require("./custom-api-error");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");

module.exports = {
  BadRequestError,
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
};
