const pool = require('../services/db');

const SQLSTATEMENT = `
DROP TABLE IF EXISTS pokedex;

DROP TABLE IF EXISTS pokemon;

DROP TABLE IF EXISTS player;

CREATE TABLE Pokemon (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  dex_num INT NOT NULL,
  hp INT,
  atk INT,
  def INT
);

CREATE TABLE Pokedex (
  number INT PRIMARY KEY,
  name TEXT NOT NULL,
  type1 TEXT NOT NULL,
  type2 TEXT NOT NULL
);

CREATE TABLE Player (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name TEXT NOT NULL,
  level INT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Pokedex (number, name, type1, type2) VALUES
(1, 'Bulbasaur', 'Grass', 'Poison'),
(2, 'Ivysaur', 'Grass', 'Poison'),
(3, 'Venusaur', 'Grass', 'Poison'),
(4, 'Charmander', 'Fire', ''),
(5, 'Charmeleon', 'Fire', ''),
(6, 'Charizard', 'Fire', 'Flying'),
(7, 'Squirtle', 'Water', ''),
(8, 'Wartortle', 'Water', ''),
(9, 'Blastoise', 'Water', '');

INSERT INTO Player (name, level) VALUES
('Ash', 1),
('Misty', 21),
('Brock', 30);

INSERT INTO Pokemon (owner_id, dex_num, hp, atk, def) VALUES
(1, 4, 100, 5, 6),
(2, 1, 100, 5, 6),
(2, 5, 160, 27, 26),
(2, 9, 200, 52, 55);
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
  if (error) {
    console.error('Error creating tables:', error);
  } else {
    console.log('Tables created successfully:', results);
  }
  process.exit();
});
