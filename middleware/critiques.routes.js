const express = require('express');
const critiques = require('../controllers/critiques.controller');

const router = express.Router();

router.get('/allcritiques', critiques.getCritiques);
router.post('/upload', critiques.createCritique);
router.get('/critique/:id', critiques.getCritiqueById);
router.get('/critique/:title', critiques.getCritiqueByTitle);
router.get('/critique/:genre', critiques.getCritiqueByGenre);
router.patch('/critiques/:id', critiques.updateCritique);
router.delete('/critique/:id', critiques.deleteCritque);

module.exports = router;
