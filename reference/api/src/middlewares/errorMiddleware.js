const statusCodes = require("http-status-codes");
const errorMiddleware = (error, _request, response, _next) => {
  response.status(error.status || statusCodes.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: error.message,
    errors: error.errors
  });
};
module.exports = errorMiddleware;