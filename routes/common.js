const { Router } = require('express');
const app = Router();

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

module.exports = app;
