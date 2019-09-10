const express = require('express');
const critiques = require('../controllers/critiques.controller');

const router = express.Router();

// Gets all   /critiques/allcritiques
router.get('/all', critiques.getCritiques);

// Adds a new /critiques/register
router.post('/critique', critiques.createCritique);

// Selects a critique  critiques/user
router.get('/critique/:user', critiques.getCritiqueByUsername);

// Updates a    critiques/critiques/id
router.patch('/critique/:id', critiques.updateCritique);

// Deletes a critique from the database based on their ID
router.delete('/critique/:id', critiques.deleteCritique);

module.exports = router;
