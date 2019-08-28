const express = require('express');
const users = require('../controllers/users.controller');

const router = express.Router();
// Gets all   /users/allusers
router.get('/allusers', users.getUsers);
// Adds a new /users/register
router.post('/register', users.createUser);
// Selects a user  users/user/id
router.get('/user/:id', users.getUserById);
// Updates a    users/users/id
router.patch('/users/:id', users.updateUser);
// Deletes a user from the database based on their ID
router.delete('/user/:id', users.deleteUser);

module.exports = router;
