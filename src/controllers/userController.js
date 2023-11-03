const model = require('../models/userModel');

module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readAllUsers:', error);
      res.status(500).json(error);
    } else res.status(200).json(results);
  };

  model.selectAll(callback);
};

module.exports.readUserById = (req, res) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readUserById:', error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: 'User not found',
        });
      } else {
        if (req.params.status != undefined)
          res.status(req.params.status).json({
            message: 'User created successfully',
            user: results[0],
          });
        else res.status(200).json(results[0]);
      }
    }
  };

  model.selectById(data, callback);
};

module.exports.createNewUser = (req, res, next) => {
  if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
    res.status(400).send('Error: username or email or password is undefined');
    return;
  }

  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error createNewUser:', error);
      res.status(500).json(error);
    } else {
      req.params = {
        id: results.insertId,
        status: 201,
      };
      next();
    }
  };

  model.insertSingle(data, callback);
};

module.exports.updateUserById = (req, res, next) => {
  if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
    res.status(400).json({
      message: 'Error: username or email or password is undefined',
    });
    return;
  }

  const data = {
    id: req.params.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error updateUserById:', error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: 'User not found',
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.updateById(data, callback);
};

module.exports.deleteUserById = (req, res, next) => {
  const data = {
    id: req.params.id,
  };

  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error deleteUserById:', error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: 'User not found',
        });
      } else res.status(204).send(); // 204 No Content
    }
  };

  model.deleteById(data, callback);
};
