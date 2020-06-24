const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const grController = require('./controllers/grController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

// OAuth
app.get('/goodreads', grController.requestToken);
app.get('/callback', grController.processCallback);

app.get('/getshelves', grController.getShelves);
app.get('/getshelf/:name', grController.getShelf);
app.post('/book', grController.getBook);

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

// statically serve everything in the build folder on the route '/build'
if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/*', (req, res) => {
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
