const express = require('express');
const snippet = require('../models/Snippet.model');
const snippets = require('../controllers/snippets.controller');

const router = express.Router();

// GET HOME
router.get('/', (request, response) => {
  response.send('Welcome to my server');
});

// GET ALL
router.get('/api/snippets', snippets.getSnippets);

router.post('/api/snippets', snippets.createSnippet);

router.get('/api/snippets/:id', snippets.getSnippetById);

router.patch('/api/snippets/:id', async (request, response) => {
  const Snippet = await snippet.patch(request.body);
});

module.exports = router;
