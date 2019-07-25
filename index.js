const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');

const app = express();

app.use(logger);
app.use(router);

app.listen(5000, () => {
  console.log('snipps runnin in server in port 5000');
});
