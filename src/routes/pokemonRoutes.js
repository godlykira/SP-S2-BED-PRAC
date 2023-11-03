const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokemonController');
const pokedexController = require('../controllers/pokedexController');
const pokemonController = require('../controllers/pokemonController');

router.get('/', controller.readAllPokemon);
router.post('/', pokedexController.getRandomDex, pokemonController.createPokemon, pokemonController.readPokemonById); //Advance Exercise
router.get('/dex', controller.readAllPokemonWithDexInfo); //Advance Exercise
router.get('/:id', controller.readPokemonById);
router.get('/:id/dex', controller.readPokemonByIdWithDexInfo); //Advance Exercise

module.exports = router;
