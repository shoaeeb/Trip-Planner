class CustomAPIError extends Error {
  constructor(message, statusCodes) {
    super(message);
  }
}

module.exports = CustomAPIError;
