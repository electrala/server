const express = require('express');
const usersRouter = require('./users.routes');

const app = express();

app.use('/users', usersRouter);

module.exports = app;
