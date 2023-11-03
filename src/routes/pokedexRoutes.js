const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokedexController');

router.get('/', controller.readAllPokedex);
router.get('/:number', controller.readPokedexByNumber);

router.post('/', controller.createNewPokedox);

router.put('/:number', controller.updatePokedoxByNumber);

router.delete('/:number', controller.deletePokedoxByNumber);

module.exports = router;
