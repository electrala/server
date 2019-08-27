<<<<<<< HEAD
const registrationRoute = require('./registration.routes');
const critiquesRoute = require('./critiques.routes');

const routeObj = { registrationRoute, critiquesRoute };

module.exports = routeObj;
=======
const express = require('express');
const usersRouter = require('./users.routes');
const critiquesRouter = require('./critiques.routes');

const app = express();

app.use('/users', usersRouter);
app.use('/critiques', critiquesRouter);

module.exports = app;
>>>>>>> 214ee11aa4d00f9dd2f24ecdc443d9aa77309995
