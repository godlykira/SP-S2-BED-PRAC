const csv = require('csv-parser');
const fs = require('fs');
const pool = require('./src/services/db');

populateDex = (data, callback) => {
  const SQLSTATEMENT = `
  INSERT INTO pokedex (number, name, type1, type2) VALUES (?, ?, ?, ?);
  `;

  pool.query(SQLSTATEMENT, data, callback);
};

const results = [];
let VALUES = [];
fs.createReadStream('./examples/csv/pokedex.csv')
  .pipe(csv())
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
    VALUES = results.map(({ number, name, type1, type2 }) => [number, name, type1, type2]);
    VALUES.forEach((data) => {
      populateDex(data, callback);
    });
    setTimeout(() => {
      process.exit();
    }, 5000);
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });

console.log(VALUES);

const callback = (error, result, fields) => {
  if (error) {
    console.error('Error populating data:', error);
  } else {
    console.log('results:', result);
  }
};
