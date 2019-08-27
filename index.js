// names of the different paths
const express = require('express');
// const logger = require('./middleware/logger');
const router = require('./middleware/meta.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* MIDDLEWARE */
app.use(express.json());
// app.use(logger);
app.use('/', router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('Running server at port 5000');
});
