const express = require('express');
const newUsers = require('../controllers/registration.controller');

const router = express.Router();

// GET HOME
router.get('/', (request, response) => {
  response.send('Welcome to my server');
});
// Route that leads to geting all the users in our db
router.get('/api/allusers', newUsers.getUsers);
// Route that leads to registering a new user in our db
router.post('/api/register', newUsers.createUser);
// Route that selects a user in our db based on their ID
router.get('/api/user/:id', newUsers.getUserById);
// Route that updates a user in our db based on their ID
router.patch('/api/users/:id', newUsers.updateUser);
// Route that deletes a user in our db based on their ID
router.delete('/api/user/:id', newUsers.deleteUser);

module.exports = router;
