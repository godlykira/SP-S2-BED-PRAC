//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require('../models/userModel');

//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.selectAllUser = (req, res, next) => {
  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  };

  model.selectAll(callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({ message: 'Username or Password not found!' });
  }

  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      if (results.length !== 0) {
        const last_login_on = (errors, results, fields) => {
          if (errors) {
            res.status(500).json({ Error: 'Internal Server Error' });
          }
        };

        model.updateLastLogin(results[0].id, last_login_on);

        res.locals.hash = results[0].password;
        next();
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  };

  model.selectByNameOrEmail({ username: username }, callback);
};

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: res.locals.hash,
  };

  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.locals.userId = results.insertId;
      res.locals.message = `User ${data.username} created successfully.`;
      next();
    }
  };

  model.insertSingle(data, callback);
};

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(404).json({ message: `Username or Email not found!` });
  } else if (!password) {
    return res.status(404).json({ message: 'Password not found!' });
  }

  const callback = (errors, results, fields) => {
    if (errors) {
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      if (results.length !== 0) {
        res.status(409).json({ message: 'Username or email already exists' });
      } else {
        next();
      }
    }
  };

  model.selectByNameOrEmail({ username: username, email: email }, callback);
};

//////////////////////////////////////////////////////
// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////
