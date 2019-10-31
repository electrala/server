const express = require('express');
const usersRouter = require('./users.routes');
const critiquesRouter = require('./critiques.routes');
const awsRouter = require('./aws.routes');

const app = express();

app.use('/', (request, response) => {
  // console.log("We're in the router");
  response.send('Welcome to Snips!');
});
app.use('/users', usersRouter);
app.use('/critiques', critiquesRouter);
app.use('/aws', awsRouter);

module.exports = app;
