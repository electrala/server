const express = require('express');
const users = require('../controllers/registration.controller');

const router = express.Router();

// GET HOME
router.get('/', (request, response) => {
  response.send('Welcome to my server');
});
// Route that leads to geting all the users in our db
router.get('/allusers', users.getUsers);
// Route that leads to registering a new user in our db
router.post('/register', users.createUser);
// Route that selects a user in our db based on their ID
router.get('/user/:id', users.getUserById);
// Route that updates a user in our db based on their ID
router.patch('/users/:id', users.updateUser);
// Route that deletes a user in our db based on their ID
router.delete('/user/:id', users.deleteUser);

module.exports = router;
