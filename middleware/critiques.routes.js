const express = require('express');
const users = require('../controllers/critiques.controller');

const router = express.Router();

// Gets all   /critiques/allcritiques
router.get('/allcritiques', critiques.getCritiques);

// Adds a new /critiques/register
router.post('/register', critiques.createCritique);

// Selects a critique  critiques/user/id
router.get('/critique/:id', critiques.getCritiqueByUsername);

// Updates a    critiques/critiques/id
router.patch('/critique/:id', critiques.updateCritique);

// Deletes a critique from the database based on their ID
router.delete('/critique/:id', critiques.deleteCritique);

module.exports = router;
