class ErrorHandler extends Error {
  constructor(status, message, code) {
    super(message);

    this.status = status;
    this.message = message;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
