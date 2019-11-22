const express = require('express');
const comments = require('../controllers/comments.controller');
const validate = require('./validate');

const router = express.Router();

// Gets all comments in table
router.get('/all', comments.getAllComments);

// Adds a new comment to the table
router.post('/new', comments.createComment);

// Select a single comment by its ID
// router.get('/:id', comments.getCommentByID);

// Select comments related to a single critique it belongs to
router.get('/:critiqueID', comments.getCommentsByCritiqueID);

// Select comments related to a single user
// router.get('/:username', comments.getCommentsByUsername);

// Updates a comment
router.patch('/:id', comments.updateComment);

// Deletes a comment by id
router.delete('/:id', comments.deleteComment);

module.exports = router;
