exports.logger = (request, response, next) => {
  console.log(`${request.method} ${request.path} ${Date.now()}`);
  next();
};
