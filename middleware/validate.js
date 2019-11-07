const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  console.log(request);
  const auth = request.headers.authorization;
  if (!auth) return response.send(401);
  const token = auth.split(' ')[1];

  try {
    // jwt.verify has a third parameter which is a call back function
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      // Attached data to request.decoded so you can use outside this function,
      // the decoded part is just something I made up. Could have put request.bananas
      request.decoded = data;
      if (err) {
        throw err;
      }
    });
    next();
  } catch (err) {
    response.sendStatus(401);
  }
};
