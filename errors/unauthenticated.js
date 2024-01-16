const CustomAPIError = require("./custom-api-error");

class UnauthentatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnauthentatedError;
