const express = require('express');
const registrationRouter = require('./registration.routes');
const critiquesRouter = require('./critiques.routes');

const app = express();

app.use('/registration', registrationRouter);
app.use('/critiques', critiquesRouter);

module.exports = app;
