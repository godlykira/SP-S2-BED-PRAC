//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
  const SQLSTATEMENTS = `
    SELECT * FROM user;
    `;
  pool.query(SQLSTATEMENTS, callback);
};

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME
//////////////////////////////////////////////////////
module.exports.selectById = (id, callback) => {
  const SQLSTATEMENTS = `
    SELECT * FROM user WHERE id = ?;
    `;
  pool.query(SQLSTATEMENTS, id, callback);
};

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.selectByNameOrEmail = (data, callback) => {
  const SQLSTATEMENTS = `
    SELECT * FROM user WHERE username = ? OR email = ?;
    `;
  const VALUES = [data.username, data.email];
  pool.query(SQLSTATEMENTS, VALUES, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENTS = `
    INSERT INTO user (username, email, password) VALUES (?, ?, ?);
  `;
  const VALUES = [data.username, data.email, data.password];
  pool.query(SQLSTATEMENTS, VALUES, callback);
};

module.exports.updateLastLogin = (id, callback) => {
  const SQLSTATEMENTS = `
    UPDATE user SET last_login_on = CURRENT_TIMESTAMP WHERE id = ?;
  `;
  pool.query(SQLSTATEMENTS, id, callback);
};
