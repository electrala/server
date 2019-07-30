const express = require('express');
const router = require('./middleware/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./utils/ErrHTTP');

const app = express();

/* MIDDLEWARE */
app.use(express.json());
app.use(logger);
app.use(router);

app.listen(process.env.PORT || 5000, () => {
  console.log('snipps runnin in server in port 5000');
});
