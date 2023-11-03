const pool = require('../services/db');

module.exports.selectAll = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM pokemon;
    `;

  pool.query(SQLSTATEMENT, callback);
};

module.exports.insertSingle = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO pokemon (dex_num, hp, atk, def) VALUES (?, ?, ?, ?);
    `;

  pool.query(SQLSTATEMENT, [data.dex_num, data.hp, data.atk, data.def], callback);
};

module.exports.selectById = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM pokemon WHERE id = ?;
    `;

  pool.query(SQLSTATEMENT, [data.id], callback);
};

module.exports.selectByIdWithDexInfo = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM pokemon INNER JOIN pokedex ON pokedex.number = pokemon.dex_num WHERE id = ?;
    `;

  pool.query(SQLSTATEMENT, [data.id], callback);
};

module.exports.selectAllWithDexInfo = (callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM pokemon INNER JOIN pokedex ON pokedex.number = pokemon.dex_num;
    `;

  pool.query(SQLSTATEMENT, callback);
};
