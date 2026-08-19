const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(err.errors).map(
        (error) => error.message
      ),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Restaurant with this ID already exists",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorHandler;