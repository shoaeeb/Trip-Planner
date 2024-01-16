const CustomAPIError = require("./custom-api-error");

class BadRequestError extends CustomAPIError {
  constructor(messsage) {
    super(messsage);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
