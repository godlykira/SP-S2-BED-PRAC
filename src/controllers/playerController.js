const data = require('../data');

module.exports.readAllPlayer = (req, res, next) => {
  try {
    res.status(200).json(data.player);
  } catch (error) {
    console.log('Error readAllPlayer:', error);
    res.status(400).json(error);
  }
};

module.exports.readPlayerById = (req, res, next) => {
  try {
    const id = req.params.id;
    const player = data.player.find((player) => player.id == id);

    if (player == undefined) {
      res.status(404).send('Player not found');
    } else {
      res.status(200).json(player);
    }
  } catch (error) {
    console.error('Error readPlayerById:', error);
    res.status(500).json(error);
  }
};

module.exports.createNewPlayer = (req, res, next) => {
  if (req.body.name == undefined) {
    res.status(400).send('Error: name is undefined');
    return;
  }

  try {
    const player = {
      id: data.player.length + 1,
      name: req.body.name,
      level: 1,
    };
    data.player.push(player);

    res.status(201).json({
      message: 'Player created',
    });
  } catch (error) {
    console.error('Error createNewPlayer:', error);
    res.status(500).json(error);
  }
};

module.exports.updatePlayerById = (req, res, next) => {
  if (req.body.name == undefined || req.body.level == undefined) {
    res.status(400).json({
      message: 'Error: name or level is undefined',
    });
    return;
  }

  try {
    const id = req.params.id;
    const player = data.player.find((player) => player.id == id);

    if (player == undefined) {
      res.status(404).json({
        message: 'Player not found',
      });
    } else {
      player.name = req.body.name;
      player.level = req.body.level;
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error updatePlayerById:', error);
    res.status(500).json(error);
  }
};

module.exports.deletePlayerById = (req, res, next) => {
  try {
    const id = req.params.id;
    const player = data.player.find((player) => player.id == id);

    if (player == undefined) {
      res.status(404).send('Player not found');
    } else {
      data.player = data.player.filter((player) => player.id != id);
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deletePlayerById:', error);
    res.status(500).json(error);
  }
};
