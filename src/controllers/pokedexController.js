const data = require('../data');

module.exports.getRandomDex = (req, res, next) => {
  try {
    const randdata = {
      randPokedex: data.pokedex[Math.floor(Math.random() * data.pokedex.length)].number,
    };
    module.exports = randdata;
    next();
  } catch (error) {
    console.log('Error getRandomDex:', error);
    res.status(400).json(error);
  }
};

module.exports.readAllPokedex = (req, res, next) => {
  try {
    res.status(200).json(data.pokedex);
  } catch (error) {
    console.log('Error readAllPokedex:', error);
    res.status(400).json(error);
  }
};

module.exports.readPokedexByNumber = (req, res, next) => {
  try {
    const id = req.params.number;
    const pokedex = data.pokedex.find((pokedex) => pokedex.number == id);

    if (pokedex == undefined) {
      res.status(404).send('Pokedex not found');
    } else {
      res.status(200).json(pokedex);
    }
  } catch (error) {
    console.log('Error readPokedexByNumber:', error);
    res.status(500).json(error);
  }
};

module.exports.createNewPokedox = (req, res, next) => {
  if (req.body.name == undefined) {
    res.status(400).send('Error: name is undefined');
    return;
  } else if (req.body.type1 == undefined && req.body.type2 == undefined) {
    res.status(400).send('Error: type1 and type2 is undefined');
  }

  try {
    const pokedex = {
      number: data.pokedex.length + 1,
      name: req.body.name,
      type1: req.body.type1,
      type2: req.body.type2,
    };
    data.pokedex.push(pokedex);

    res.status(201).json({
      message: 'Pokedex created',
    });
  } catch (error) {
    console.log('Error createNewPokedox:', error);
    res.status(500).json(error);
  }
};

module.exports.updatePokedoxByNumber = (req, res, next) => {
  if (req.body.name == undefined || (req.body.type1 == undefined && req.body.type2 == undefined)) {
    res.status(400).json({
      message: 'Error: name or type1 and type2 is undefined',
    });
    return;
  }

  try {
    const number = req.params.number;
    const name = data.pokedex.find((pokedex) => pokedex.number == number);

    if (name == undefined) {
      res.status(404).json({
        message: 'Pokedex not found',
      });
    } else {
      name.name = req.body.name;
      name.type1 = req.body.type1;
      name.type2 = req.body.type2;
      res.status(204).send();
    }
  } catch (error) {
    console.log('Error updatePokedoxByNumber:', error);
    res.status(500).json(error);
  }
};

module.exports.deletePokedoxByNumber = (req, res, next) => {
  try {
    const number = req.params.number;
    const pokedex = data.pokedex.find((pokedex) => pokedex.number == number);

    if (pokedex == undefined) {
      res.status(404).send('Pokedex not found');
    } else {
      data.pokedex = data.pokedex.filter((pokedex) => pokedex.number != number);
      res.status(204).send();
    }
  } catch (error) {
    console.log('Error deletePokedoxByNumber:', error);
    res.status(500).json(error);
  }
};
