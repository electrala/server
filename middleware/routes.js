const express = require('express');
const snippet = require('../models/Snippet.model');

const router = express.Router();

// GET HOME
router.get('/', (request, response) => {
  response.send('Welcome to my server');
});

// GET ALL
router.get('/api/snippets', async (request, response) => {
  // get data from snippet model
  const snippets = await snippet.select();
  // send that data out
  return response.send(snippets);
});

// GET with Id
router.get('/api/snippets/:id', (request, response) => {
  response.send('got specific id ');
});

// POST
router.post('/api/snippets', (request, response) => {
  response.send();
});
// UPDATE
router.patch('/api/snippets/:id', (request, response) => {
  response.send('updated');
});

module.exports = router;
