const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Max number of requests 
  message: 'Too many requests ',
});

module.exports = limiter;