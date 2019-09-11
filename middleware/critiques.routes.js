const express = require('express');
const critiques = require('../controllers/critiques.controller');

const router = express.Router();

// Gets all   /critiques/all
router.get('/all', critiques.getCritiques);

// Adds a new /critiques/new
router.post('/new', critiques.createCritique);

// Selects a critique  critiques/user
router.get('/user/:username', critiques.getCritiqueByUsername);

// Updates a    critiques/critiques/id
router.patch('/:id', critiques.updateCritique);

// Deletes a critique from the database based on their ID
router.delete('/:id', critiques.deleteCritique);

module.exports = router;
