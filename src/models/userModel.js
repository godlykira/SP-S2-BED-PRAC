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
