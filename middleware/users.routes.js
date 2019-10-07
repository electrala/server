const express = require('express');
const users = require('../controllers/users.controller');

const router = express.Router();
// Gets all   /users/allusers
router.get('/allusers', users.getUsers);

/* Sign up and log in routes */
router.post('/register', users.createUser);
router.post('/login', users.logIn);

// Selects a user  users/user/id
router.get('/user/:userid', users.getUserById);
// Updates a    users/users/id
router.patch('/users/:id', users.updateUser);
// Deletes a user from the database based on their ID
router.delete('/user/:id', users.deleteUser);

module.exports = router;
