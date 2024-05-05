const { Router } = require('express');
const db = require('../helpers/connector');
const logMessage = require('../helpers/logger');
const app = Router();

// Endpoint to view the flights
app.get('/view-flights', function (req, res) {
  let additionalData = { message: '' };
  if (req.session.user) {
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-users">Edit Roles</a></div></li>`;
      res.render('pages/view-flights', additionalData);
    }
  } else {
    res.render('pages/index');
  }
});

// Endpoint to add the flights
app.get('/add-flights', function (req, res) {
  let additionalData = { message: '' };
  if (req.session.user) {
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-users">Edit Roles</a></div></li>`;
      res.render('pages/add-flights', additionalData);
    }
  } else {
    res.render('pages/index');
  }
});

// Endpoint for adding a new flight to the application.
app.post('/add-flights', function (req, res) {
  // Verifying if the user has the privilege to add a flight.
  if (req.session.user) {
    if (req.session.user.privilege == 'admin') {
      // Migrating the data from request to different variables for pre-processing.
      let flightName = req.body.flightName;
      let flightType = req.body.flightType;
      let boardingPoint = req.body.boardingPoint;
      let destination = req.body.destination;
      let departureTime = req.body.departureTime;
      let arrivalTime = req.body.arrivalTime;
      let seatCount = req.body.seatCount;
      let economySeatCount = req.body.economySeatCount;
      let businessSeatCount = req.body.businessSeatCount;
      let mealCost = req.body.mealCost;
      let economySeatCost = req.body.economySeatCost;
      let businessSeatCost = req.body.businessSeatCost;

      // Drafting the query with the information to be saved.
      const queryString = `INSERT INTO flights (flightName, flightType, boardingPoint, destination, departureTime, arrivalTime, seatCount, economySeatCount, businessSeatCount, mealCost, economySeatCost, businessSeatCost) VALUES ('${flightName}', '${flightType}', '${boardingPoint}', '${destination}', '${departureTime}', '${arrivalTime}', ${seatCount}, ${economySeatCount}, ${businessSeatCount}, ${mealCost}, ${economySeatCost}, ${businessSeatCost});`;
      // Invoking the executeQuery helper function to save the registration details into the database.
      db.executeQuery(queryString, (error, results) => {
        // Handling the error and success scenarios.
        if (error) {
          console.error('Error executing query:', error);
          logMessage('error', `Error executing query: ${error}`);
        } else {
          console.log('Query results:', results);
          logMessage('info', `Query results: ${results}`);
          res.send('ok');
        }
      });
    }
  } else {
    res.render('pages/index');
  }
});

// Endpoint for fetching the flight data from database and sending it to UI as JSON Object.
app.get('/list-flights', function (req, res) {
  const queryString = `SELECT id, flightName, boardingPoint, destination, departureTime, arrivalTime FROM flights;`;
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
})
module.exports = app;
