const logger = require('../utils/logger.util.js');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err.isJoi) {
    return res.status(400).json({
      type: 'ValidationError',
      details: err.details.map(detail => detail.message)
    });
  }
  
  res.status(500).json({
    message: 'An unexpected error occurred',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

module.exports = errorHandler;
