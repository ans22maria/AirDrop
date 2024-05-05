// Imports and Global declarations
const { Router } = require('express');
const db = require('../helpers/connector');
const logMessage = require('../helpers/logger');
const app = Router();

// Post Request for reserving a ticket.
app.post('/reserve', (req, res) => {
  // Migrating the data from request to different variables for pre-processing.
  let user_id = req.session.user.id;
  let flight_id = req.body.flight_id;
  let travelDate = req.body.travelDate;
  let boardingPoint = req.body.boardingPointSelector;
  let destination = req.body.destinationSelector;
  let seatType = req.body.seatSelector;
  let meal = req.body.mealSelector;
  let total = req.body.total;

  // Drafting the query with teh information to be saved.
  const queryString = `INSERT INTO bookings (user_id, flight_id, travelDate, boardingPoint, destination, seatType, meal, total) VALUES (${user_id}, ${flight_id}, '${travelDate}', '${boardingPoint}','${destination}','${seatType}', '${meal}', ${total});`;
  // Invoking the executeQuery helper function to save the registration details into the database.
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

// Endpoint For Rendering Tickets
app.get('/tickets', (req, res) => {
  if (req.session.user) {
    let additionalData = { message: '' };
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-roles">Edit Roles</a></div></li>`;
    }
    res.render('pages/tickets', additionalData);
  } else {
    res.redirect('/');
  }
});

// Endpoint to list the tickets based on user data
app.get('/list-tickets', function (req, res) {
  console.log('in list users');
  const queryString = `SELECT id, user_id, boardingPoint, destination, travelDate FROM bookings where user_id = '${req.session.user.id}';`;
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
