const fs = require('fs').promises;

function log(file) {
  return fs.appendFile(`log.txt`, `${file}`);
}

async function logger(request, response, next, file) {
  console.log(request.method, request.path, Date.now());
  return log(`${file}`);
  // move on to the next type of middleware;
}

module.exports = logger;
