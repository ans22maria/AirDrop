// Global declarations
const express = require('express');
const logMessage = require('./helpers/logger');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const commonRouter = require('./routes/common');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const reservationRouter = require('./routes/reserve');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const flightRouter = require('./routes/flights');

const port = 443;

// Defining the express app
const app = express();

// HTTPS Options
const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Middleware to enforce HTTPS-only
app.use((req, res, next) => {
    if (req.secure) {
        res.setHeader('Set-Cookie', 'HttpOnly;Secure;SameSite=Strict');
        next();
    } else {
        // Redirect HTTP requests to HTTPS
        res.redirect(`https://${req.headers.host}${req.url}`);
    }
});

app.use(cookieParser());

// Defining body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router definition calls
app.use(commonRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(reservationRouter);
app.use(homeRouter);
app.use(userRouter);
app.use(flightRouter);

// Setting the view engine ejs
app.set('view engine', 'ejs');

// Set the static path to the home public directory.
app.use(express.static(__dirname + '/public'));

// Create HTTPS server
const server = https.createServer(httpsOptions, app);

server.listen(port);
logMessage('info', `Server is listening on port ${port}`);
