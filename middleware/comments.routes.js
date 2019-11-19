const express = require('express');
const comments = require('../controllers/comments.controller');
const validate = require('./validate');

const router = express.Router();

// Gets all comments in table
router.get('/all', comments.getAllComments);

// Adds a new comment to the table
router.post('/new', validate, comments.createComment);

// Select a single critique by its ID
router.get('/:id', comments.getCommentByID);

// Select comments related to a single critique it belongs to
router.get('/:critiqueID', comments.getCommentsBelongingToCritique);

// Select comments related to a single user
router.get('/:username', comments.getCommentsBelongingToUser);

// Updates a comment
router.patch('/:id', validate, comments.updateComment);

// Deletes a comment by id
router.delete('/:id', validate, comments.deleteComment);

module.exports = router;
