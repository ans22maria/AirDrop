const { Router } = require('express');
const db = require('../helpers/connector');
const logMessage = require('../helpers/logger');
const app = Router();

// endpoint to view the users
app.get('/view-users', function (req, res) {
  let additionalData = { message: '' };
  if (req.session.user) {
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-users">Edit Roles</a></div></li>`;
      res.render('pages/view-users', additionalData);
    }
  } else {
    res.render('pages/index');
  }
});

// endpoint to edit the users roles
app.get('/edit-users', function (req, res) {
  let additionalData = { message: '' };
  if (req.session.user) {
    if (req.session.user.privilege == 'admin') {
      additionalData.message = `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Flights</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-flights">View Flights</a><a class="dropdown-item" href="/add-flights">Add Flights</a></div></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users</a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="/view-users">View Users</a><a class="dropdown-item" href="/edit-users">Edit Roles</a></div></li>`;
      res.render('pages/edit-users', additionalData);
    }
  } else {
    res.render('pages/index');
  }
});

// Endpoint for fetching the user data from database and sending it to UI as JSON Object.
app.get('/list-user', function (req, res) {
  console.log('in list users');
  const queryString = `SELECT id, name, phone_number, email, privilege FROM users;`;
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
