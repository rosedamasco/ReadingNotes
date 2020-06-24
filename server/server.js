const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const goodreads = require('goodreads');

const gr = new goodreads.client({
  key: 'xZJUf8eT5TiIdX2nzR1IA',
  secret: '74b6ftYwOszmywzIJJB06IoD1AIFvdGSKpXthBh8o',
});
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/goodreads', (req, res) => {
  console.log('inside /goodreads');
  gr.requestToken((object) => {
    console.log(object);
    return res.redirect(object.url);
  });
});

app.get('/callback', (req, res) => {
  console.log('we in token');
  console.log('oauth_token: ', req.query.oauth_token);
  console.log('authorize: ', req.query.authorize);
});

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });
}

app.use((req, res) => res.status(404).send('Page not found'));

app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
