const data = require('../data');

module.exports.readAllPokemon = (req, res, next) => {
  try {
    res.status(200).json(data.pokemon);
  } catch (error) {
    console.log('Error readAllPokemon:', error);
    res.status(400).json(error);
  }
};

module.exports.readAllPokemonWithDexInfo = (req, res, next) => {
  try {
    const pokeWithDex = data.pokemon.map((pokemon) => ({
      ...pokemon,
      ...data.pokedex[pokemon.dex_num - 1],
    }));
    res.status(200).json(pokeWithDex);
  } catch (error) {
    console.log('Error readAllPokemonWithDexInfo:', error);
    res.status(400).json(error);
  }
};

module.exports.createPokemon = (req, res, next) => {
  const randPokedex = require('../controllers/pokedexController.js');
  try {
    const owner_id = req.body.owner_id;

    if (owner_id == undefined) {
      res.status(400).json({
        message: 'Error: owner_id is undefined',
      });
      return;
    } else {
      const newPokemon = {
        id: data.pokemon.length + 1,
        owner_id: req.body.owner_id,
        dex_num: randPokedex.randPokedex,
        hp: Math.floor(Math.random() * 200),
        atk: Math.floor(Math.random() * 100),
        def: Math.floor(Math.random() * 100),
      };
      data.pokemon.push(newPokemon);

      req.params = {
        id: newPokemon.id,
      };
      next();
    }
  } catch (error) {
    console.log('Error createPokemon:', error);
    res.status(400).json(error);
  }
};

module.exports.readPokemonById = (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = data.pokemon.find((pokemon) => pokemon.id == id);

    if (pokemon == undefined) res.status(404).send('Pokemon not found');
    else res.status(200).json(pokemon);
  } catch (error) {
    console.error('Error readPokemonById:', error);
    res.status(500).json(error);
  }
};

module.exports.readPokemonByIdWithDexInfo = (req, res, next) => {
  try {
    const id = req.params.id;
    const pokemon = data.pokemon.find((pokemon) => pokemon.id == id);

    if (pokemon == undefined) {
      res.status(404).send('Pokemon not found');
    } else {
      const pokeWithDex = [{ ...pokemon, ...data.pokedex[pokemon.dex_num - 1] }];
      res.status(200).json(pokeWithDex);
    }
  } catch (error) {
    console.log('Error readPokemonByIdWithDexInfo:', error);
    res.status(500).json(error);
  }
};
