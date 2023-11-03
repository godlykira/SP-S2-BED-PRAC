const pool = require('../services/db');

const SQLSTATEMENT = `
TRUNCATE TABLE pokedex;
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error('Error creating tables:', error);
  } else {
    console.log('Tables created successfully:', results);
  }
  process.exit();
});
