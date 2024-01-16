const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something Went Wrong!",
  };

  if (err instanceof CustomAPIError) {
    customError.message = err.message;
    customError.statusCode = err.statusCode;
    return res
      .status(customError.statusCode)
      .json({ msg: customError.message });
  }

  if (err.code && err.code === 11000) {
    customError.message = `${
      err.keyValue[Object.keys(err.keyValue)[0]]
    } is already taken`;
    customError.statusCode = 400;
  }
  console.log(err);

  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
