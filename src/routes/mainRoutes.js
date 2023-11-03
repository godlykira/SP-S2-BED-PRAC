const express = require('express');
const router = express.Router();
const playerRoutes = require('./playerRoutes');
const pokedexRoutes = require('./pokedexRoutes');
const pokemonRoutes = require('./pokemonRoutes');

router.use('/pokemon', pokemonRoutes);
router.use('/pokedex', pokedexRoutes);
router.use('/player', playerRoutes);
router.use('/', pokemonRoutes);

module.exports = router;
