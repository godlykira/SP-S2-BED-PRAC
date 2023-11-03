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
