const express = require('express');
const newUsers = require('../controllers/registration.controller');

const router = express.Router();

router.get('/', (request, response) => {
  response.send('Welcome to my server');
});

router.get('/api/allusers', newUsers.getUsers);

router.post('/api/register', newUsers.createUser);

router.get('/api/user/:id', newUsers.getUserById);

router.patch('/api/users/:id', newUsers.updateUser);

router.delete('/api/user/:id', newUsers.deleteUser);

module.exports = router;
