const mysql = require('mysql2');
require('dotenv').config();

const setting = {
  connectionLimit: 10, //set limit to 10 connection
  host: 'localhost',
  user: process.env.user,
  password: process.env.password,
  database: 'pokemon',
  multipleStatements: true, //allow multiple sql statements
  dateStrings: true, //return date as string instead of Date object
};

const pool = mysql.createPool(setting);

module.exports = pool;
