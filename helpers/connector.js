const mysql = require('mysql');
const logMessage = require('./logger');
const host = '127.0.0.1';
const user = 'root';
const password = "";
const database = 'airdrop';

/**
 * Function to establish database connection
 */
function connectToDatabase() {
  const connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
  });

  connection.connect((err) => {
    if (err) {
      logMessage('error', `Error connecting to MySQL database: ${err}`);
      return;
    }
    logMessage('info', 'Connected to MySQL database!');
  });

  return connection;
}

/**
 * Function to execute SQL query
 * @param {*} query
 * @param {*} callback
 */
function executeQuery(query, callback) {
  const connection = connectToDatabase();

  connection.query(query, (error, results, fields) => {
    if (error) {
      logMessage('error', `Error executing query: ${error}`);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });

  connection.end();
}

module.exports = {
  connectToDatabase,
  executeQuery
};
