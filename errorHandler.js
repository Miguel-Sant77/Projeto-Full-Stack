// middlewares/errorHandler.js
module.exports = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
      message: err.message || 'Ocorreu um erro inesperado.',
      stack: err.stack,
    });
  };
  