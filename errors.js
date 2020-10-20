exports.handle404 = (req, res, next) => {
  const err = new Error(`Page not found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};

exports.errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
};
