const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Player;
    `;
  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM Player WHERE id = ?;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO Player (name, level) VALUES (?, ?);
    `;
  const VALUES = [data.name, data.level];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.updateById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE Player SET name = ?, level = ? WHERE id = ?; 
    `;
  const VALUES = [data.name, data.level, data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

module.exports.deleteById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM Player WHERE id = ?;
    ALTER TABLE Player AUTO_INCREMENT = 1;
    `;
  const VALUES = [data.id];

  pool.query(SQLSTATEMENT, VALUES, callback);
};

// Advance

module.exports.selectAllRef = (callback) => {
  const SQLSTATEMENT = `
      SELECT PlayerUserRel.user_id, PlayerUserRel.player_id, User.username, Player.name as character_name, Player.level as character_level, Player.created_on as char_created_on, User.created_on as user_created_on
      FROM PlayerUserRel
      INNER JOIN Player ON Player.id = PlayerUserRel.player_id
      INNER JOIN User ON User.id = PlayerUserRel.user_id;
  `;
  pool.query(SQLSTATEMENT, callback);
};
