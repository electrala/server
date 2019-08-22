const ErrHTTP = require('../utils/ErrHTTP');

/**
 * Handle errors with server
 * @param {object} err
 * @param {object} request
 * @param {object} response
 * @param {object} next
 */
const errorHandler = (err, request, response, next) => {
  if (err instanceof ErrHTTP) response.status(err.status).send(err.message);
  else response.status(500).send('Server error');
};

module.exports = errorHandler;
