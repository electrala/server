const express = require('express');
const usersRouter = require('./users.routes');
const critiquesRouter = require('./critiques.routes');

const app = express();

app.use('/users', usersRouter);
app.use('/critiques', critiquesRouter);
app.use('/', (request, response) => {
  response.send('your mom!');
});
module.exports = app;
