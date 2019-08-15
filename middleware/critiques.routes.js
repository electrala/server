const express = require('express');
const critiques = require('../controllers/critiques.controller');

const router = express.Router();

router.post('/upload', critiques.createCritique);
router.get('/allcritiques', critiques.getCritiques);
router.get('/critique/:id', critiques.getCritiqueById);
router.get('/critique/:title', critiques.getCritiqueByTitle);
router.get('/critique/:genre', critiques.getCritiqueByGenre);
router.delete('/critique/:id', critiques.deleteCritque);
router.patch('/critiques/:id', critiques.updateCritique);

module.exports = router;
