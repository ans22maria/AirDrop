// Imports and Global declarations
const { Router } = require('express');
const session = require('express-session');
const logMessage = require('../helpers/logger');
const db = require('../helpers/connector');
const app = Router();
const secret = 'secret_key_for_airdrop';

// For session initialization.
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
);

// Login page
app.get('/login', function (req, res) {
  res.render('pages/login');
});

// Post Request for registering a new user.
app.post('/login', (req, res) => {
  // Migrating the data from request to different variables for pre-processing.
  let email = req.body.email;
  let password = req.body.password;

  // Drafting the query with teh information to be saved.
  const queryString = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`;
  // Invoking the executeQuery helper function to save the registration details into the database.
  db.executeQuery(queryString, (error, results) => {
    // Handling the error and success scenarios.
    if (error) {
      logMessage('error', `Error executing query: ${error}`);
    } else {
      logMessage('info', `Query results: ${results}`);
      if (results.length == 1) {
        req.session.user = {
          name: results[0].name,
          id: results[0].id,
          privilege: results[0].privilege
        };
        res.redirect('/home');
      } else {
        res.send('Invalid');
      }
    }
  });
});

module.exports = app;
