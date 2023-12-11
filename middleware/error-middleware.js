exports.errorMiddleware = (error, req, res, next) => {
    console.log(error);
    const message = error.message || "Something went wrong with the server!";
    const status = error.statusCode || 500;
    res.status(status).json({ message: message, status: status });
  };