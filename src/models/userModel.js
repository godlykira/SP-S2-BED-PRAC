const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
      SELECT User.id, User.username, User.email, User.created_on, User.updated_on, User.last_login_on FROM User;
      `;
  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT User.id, User.username, User.email, User.created_on, User.updated_on, User.last_login_on FROM User WHERE id = ?;
      `;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
      INSERT INTO User (username, email, password) VALUES (?, ?, ?);
      `;
  const VALUES = [data.username, data.email, data.password];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
      UPDATE User SET username = ?, email = ?, password = ? WHERE id = ?; 
      `;
  const VALUES = [data.username, data.email, data.password, data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATEMENT = `
      DELETE FROM User WHERE id = ?;
      ALTER TABLE User AUTO_INCREMENT = 1;
      `;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// Advance

module.exports.insertSingleRef = (data, callback) => {
  const SQLSTATEMENT = `
      INSERT INTO playeruserrel (user_id, player_id) VALUES (?, ?);
  `;
  const VALUES = [data.user_id, data.player_id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectByIdRef = (data, callback) => {
  const SQLSTATEMENT = `
      SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
      FROM PlayerUserRel
      INNER JOIN Player ON Player.id = PlayerUserRel.player_id
      INNER JOIN User ON User.id = PlayerUserRel.user_id WHERE Playeruserrel.user_id = ? and Playeruserrel.player_id = ?;
  `;
  const VALUES = [data.userId, data.playerId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.selectAllUserRef = (userId, callback) => {
  const SQLSTATEMENT = `
      SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
      FROM PlayerUserRel
      INNER JOIN Player ON Player.id = PlayerUserRel.player_id
      INNER JOIN User ON User.id = PlayerUserRel.user_id WHERE Playeruserrel.user_id = ?;
  `;
  pool.query(SQLSTATEMENT, userId, callback);
};

module.exports.deleteByIdRel = (data, callback) => {
  const SQLSTATEMENT = `
      DELETE FROM Playeruserrel WHERE user_id = ? and player_id = ?;
      ALTER TABLE Playeruserrel AUTO_INCREMENT = 1;
  `;
  const VALUES = [data.userId, data.playerId];
  pool.query(SQLSTATEMENT, VALUES, callback);
};
