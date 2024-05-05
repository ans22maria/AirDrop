// Imports and Global declarations 
const { Router } = require('express');
const db = require('../helpers/connector');
const logMessage = require('../helpers/logger');
const app = Router();

// For rendering the Registration page
app.get('/register', function (req, res) {
  res.render('pages/register');
});

// Post Request for registering a new user.
app.post('/register', (req, res) => {
  // Migrating the data from request to different variables for pre-processing.
  let name = req.body.name;
  let email = req.body.emailId;
  let phoneNumber = req.body.phoneNumber;
  let addressHouseNumber = req.body.addressHouseNumber;
  let addressLane = req.body.addressHouseLane;
  let zipCode = req.body.zipCode;
  let password = req.body.passwordInput;
  let privilege = 'user';

  // Drafting the query with teh information to be saved.
  const queryString = `INSERT INTO users (name, phone_number, email, address_lane, address_house_number, zip_code, password, privilege) VALUES ('${name}', '${phoneNumber}', '${email}', '${addressLane}', '${addressHouseNumber}', '${zipCode}', '${password}', '${privilege}');`;
  // Invoking the executeQuery helper function to save the registration details into the database.
  db.executeQuery(queryString, (error, results) => {
    // Handling the error and success scenarios.
    if (error) {
      console.error('Error executing query:', error);
      logMessage('error', `Error executing query: ${error}`);
    } else {
      console.log('Query results:', results);
      logMessage('info', `Query results: ${results}`);
      res.redirect('/login');
    }
  });
});

module.exports = app;
