const pool = require('../services/db');

module.exports.selectRandomDex = (callback) => {
  const SQLSTATEMENT = `
    SELECT number, name, type1, type2 FROM pokedex ORDER BY RAND() LIMIT 1;
    `;
  pool.query(SQLSTATEMENT, callback);
};

module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM pokedex;
    `;
  pool.query(SQLSTATEMENT, callback);
};
