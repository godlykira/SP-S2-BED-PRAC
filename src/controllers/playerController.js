const model = require('../models/playerModel.js');

module.exports.readAllPlayer = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readAllPlayer:', error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAll(callback);
};

module.exports.readPlayerById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readPlayerById:', error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: 'Player not found',
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectById(data, callback);
};

module.exports.createNewPlayer = (req, res, next) => {
  if (req.body.name == undefined) {
    res.status(400).send('Error: name is undefined');
    return;
  }

  const data = {
    name: req.body.name,
    level: 1,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error createNewPlayer:', error);
      res.status(500).json(error);
    } else {
      res.status(201).json(results);
    }
  };

  model.insertSingle(data, callback);
};

module.exports.updatePlayerById = (req, res, next) => {
  if (req.body.name == undefined || req.body.level == undefined) {
    res.status(400).json({
      message: 'Error: name or level is undefined',
    });
    return;
  }

  const data = {
    id: req.params.id,
    name: req.body.name,
    level: req.body.level,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error updatePlayerById:', error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: 'Player not found',
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.updateById(data, callback);
};

module.exports.deletePlayerById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error deletePlayerById:', error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: 'Player not found',
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.deleteById(data, callback);
};
