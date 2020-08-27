const { OAUTH } = require('./oauthController');
const db = require('../models/BookNoteModel');

const { API_KEY, API_SECRET } = process.env;
const GR_URL = 'https://goodreads.com';

const grShelfController = {};

grShelfController.getShelfBooks = (req, res, next) => {
  const { userid, accessToken, accessSecret } = req.cookies;
  if (!userid || !accessToken || !accessSecret) return res.redirect('/');
  const { name } = req.params;
  const useridParam = `id=${userid}`;
  const shelfParam = `shelf=${name}`;
  const keyParam = `key=${API_KEY}`;
  const shelfURL = `${GR_URL}/review/list?${useridParam}&${shelfParam}&${keyParam}&format=xml`;
  OAUTH.get(shelfURL, accessToken, accessSecret, (err, xmlResponse) => {
    if (err) {
      return next({
        log: `Error in grShelfController.getShelfBooks: ${err}`,
        message: { err: `Error in grShelfController.getShelfBooks: ${err}` },
      });
    }
    res.locals.xmlData = xmlResponse;
    return next();
  });
};

grShelfController.parseShelfBooks = (req, res, next) => {
  const { xmlObj } = res.locals;
  const shelfBooksObj = xmlObj.GoodreadsResponse.books[0].book;
  const parsedShelfBooks = [];
  shelfBooksObj.forEach((book) => {
    const bookInfo = {
      id: book.id[0]._,
      title: book.title[0],
      imgURL: book.image_url[0],
    };
    parsedShelfBooks.push(bookInfo);
  });
  res.locals.shelfBooks = parsedShelfBooks;
  return next();
};

grShelfController.addBooksToDB = (req, res, next) => {
  const { shelfBooks } = res.locals;
  const bookInsertQueries = [];
  shelfBooks.forEach((book) => {
    const bookInsertQuery = `INSERT INTO books(id, title, imgurl)
    VALUES ('${book.id}', '${book.title}', '${book.imgURL}')
    ON CONFLICT (id)
    DO NOTHING;`;
    // TO UPDATE ROW, REPALCE ABOVE LINE WITH: DO UPDATE SET title=EXCLUDED.title, imgurl=EXCLUDED.imgurl;`;
    bookInsertQueries.push(bookInsertQuery);
  });
  // CURRENT LIMITATION: >3 BOOKS CAUSES 'TOO MANY CONNECTIONS' ERROR
  Promise.all(bookInsertQueries.map((bookInsertQuery) => db.query(bookInsertQuery)))
    .then(() => next())
    .catch((err) => {
      return next({
        log: `Error in grShelfController.addBooksToDB: ${err}`,
        message: { err: `grShelfController.addBooksToDB: ${err}` },
      });
    });
};

module.exports = grShelfController;
