const { Router } = require('express');
const logMessage = require('../helpers/logger');
const db = require('../helpers/connector');
const app = Router();

// home page
app.get('/home', function (req, res) {
  if (req.session.user) {
    let additionalData = {message: ''}
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-roles">Edit Roles</a></div></li>`
    } 
		res.render('pages/home', additionalData);
    
  } else {
    res.redirect('/');
  }
});

// for logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// for getting the list of boarding points.
app.get('/list-boarding-points', (req, res) => {
  const queryString = `SELECT id, boardingPoint FROM flights;`;
  db.executeQuery(queryString, (error, results) => {
    // Handling the error and success scenarios.
    if (error) {
      console.error('Error executing query:', error);
      logMessage('error', `Error executing query: ${error}`);
    } else {
      console.log('Query results:', results);
      logMessage('info', `Query results: ${results}`);
      res.send(results);
    }
  });
});

// For getting the list of destinations, the departure and the arrival timings.
app.get('/get-destination-by-boarding-point', (req, res) => {
  const boardingPoint = req.query.parameter;
  const queryString = `SELECT id, destination, departureTime, arrivalTime FROM flights where boardingPoint='${boardingPoint}';`;
  db.executeQuery(queryString, (error, results) => {
    // Handling the error and success scenarios.
    if (error) {
      console.error('Error executing query:', error);
      logMessage('error', `Error executing query: ${error}`);
    } else {
      console.log('Query results:', results);
      logMessage('info', `Query results: ${results}`);
      res.send(results);
    }
  });
});

app.get('/get-seat-information', (req, res) => {
  const id = req.query.parameter;
  const queryString = `SELECT id, economySeatCost, businessSeatCost, mealCost FROM flights where id='${id}';`;
  db.executeQuery(queryString, (error, results) => {
    // Handling the error and success scenarios.
    if (error) {
      console.error('Error executing query:', error);
      logMessage('error', `Error executing query: ${error}`);
    } else {
      console.log('Query results:', results);
      logMessage('info', `Query results: ${results}`);
      res.send(results);
    }
  });
});

module.exports = app;
