const express = require('express');
const users = require('../controllers/users.controller');

const router = express.Router();

// Gets all the users in the database
router.get('/allusers', users.getUsers);

// Adds a new user to the database
router.post('/register', users.createUser);

// Selects a user given a unique ID
router.get('/user/:id', users.getUserById);

// Updates a user given a unique ID & user data
router.patch('/users/:id', users.updateUser);

// Deletes a user from the database based on their ID
router.delete('/user/:id', users.deleteUser);

module.exports = router;
