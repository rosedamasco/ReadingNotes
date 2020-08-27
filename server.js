const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// initialize server and port
const app = express();
const PORT = 3434;

// require routers
const oauthRouter = require('./routes/oauth');
const goodreadsRouter = require('./routes/goodreads');

// handle parsing request body
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

// FLOW TEST
app.use((req, res, next) => {
  console.log(`
  ********* FLOW TEST *********\n
  METHOD: ${req.method}\n
  URL: ${req.url}\n
  BODY: ${JSON.stringify(req.body)}\n`);
  return next();
});

// define route handlers
app.use('/oauth/', oauthRouter);
app.use('/gr/', goodreadsRouter);

// handle requests for static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// route handler to respond with main app
app.use('/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Wake up Neo... Knock, knock.'));

/**
 * configire express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening server on ${PORT}`);
});
