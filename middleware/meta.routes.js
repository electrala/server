const express = require('express');
const registrationRouter = require('./registration.routes');
// const critiquesRouter = require('./critiques.routes');

const app = express();

app.use('/api/registration', registrationRouter);
// app.use('/api/critiques', critiquesRouter);

module.exports = app;
