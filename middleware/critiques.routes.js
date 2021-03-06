const express = require('express');
const critiques = require('../controllers/critiques.controller');
const validate = require('./validate');

const router = express.Router();

// Gets all   /critiques/all
router.get('/all', critiques.getCritiques);

// Adds a new /critiques/new
router.post('/new', validate, critiques.createCritique);

// Select a single critique by ID
router.get('/:id', critiques.getCritiqueByID);

// Selects a critique  critiques/user
router.get('/user/:username', critiques.getCritiqueByUsername);

// Updates a    critiques/critiques/id
router.patch('/:id', validate, critiques.updateCritique);

// Deletes a critique from the database based on their ID
router.delete('/:id', validate, critiques.deleteCritique);

module.exports = router;
