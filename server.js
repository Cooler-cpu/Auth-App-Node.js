// server.js
const express  = require('express'),
 session  = require('express-session'),
 cookieParser = require('cookie-parser'),
 bodyParser = require('body-parser'),
 morgan = require('morgan'),
 app      = express(),
 port     = process.env.PORT || 5050,
 passport = require('passport'),
 flash    = require('connect-flash');

// configuration ==========================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); // set up ejs for templating


// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
