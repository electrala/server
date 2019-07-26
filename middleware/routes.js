const express = require('express');
const snippet = require('../models/Snippet.model');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

// GET HOME
router.get('/', (request, response) => {
  response.send('Welcome to my server');
});

router.get('/api/snippets', snippets.getSnippets);

router.post('/api/snippets', snippets.createSnippet);

router.get('/api/snippets/:id', snippets.getSnippetById);

router.patch('/api/snippets/:id', snippets.updateSnippet);

router.delete('/api/snippets/:id', snippets.deleteSnippet);

module.exports = router;
