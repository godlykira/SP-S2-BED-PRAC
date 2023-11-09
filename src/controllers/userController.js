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

module.exports.readUserById = (req, res, next) => {
  const data = {
    id: req.params.id || req.params.userId,
    // Assign the value of req.params.id to id if it is truthy, otherwise use req.params.userId
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
        else if (req.params.userId != undefined) {
          next();
        } else res.status(200).json(results[0]);
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

// Advance

module.exports.createNewRef = (req, res) => {
  const { userId } = req.params;
  const { newPlayerId } = req.body;
  const data = { user_id: userId, player_id: newPlayerId };
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error createNewRef:', error);
      res.status(500).json(error);
    } else {
      res.status(200).json({ message: `Player ${newPlayerId} created for User ${userId} successfully` });
    }
  };
  model.insertSingleRef(data, callback);
};

module.exports.readRefById = (req, res, next) => {
  const { userId, playerId } = req.params;
  const data = { userId: userId, playerId: playerId };
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readRefById:', error);
      res.status(500).json(error);
    } else {
      if (results.length == 0) {
        res.status(404).json({
          message: 'Ref not found',
        });
      } else res.status(200).json(results[0]);
    }
  };

  model.selectByIdRef(data, callback);
};

module.exports.readAllUserRef = (req, res, next) => {
  const { userId } = req.params;
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error readAllUserRef:', error);
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAllUserRef(userId, callback);
};

module.exports.updateRefById = (req, res) => {
  try {
    const { userId, playerId } = req.params;
    res.status(200).json({ message: `Player ${playerId} updated for User ${userId} successfully` });
  } catch (error) {
    console.error('Error updateRefById:', error);
    res.status(500).json(error);
  }
};

module.exports.deleteRefById = (req, res, next) => {
  const data = { userId: req.params.userId, playerId: req.params.playerId };
  const callback = (error, results, fields) => {
    if (error) {
      console.error('Error deleteRefById:', error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: 'Ref not found',
        });
      } else {
        next();
      }
    }
  };

  model.deleteByIdRel(data, callback);
};
