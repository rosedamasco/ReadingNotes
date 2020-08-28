const { OAUTH } = require('./oauthController');
const db = require('../models/BookNoteModel');

const { API_KEY, API_SECRET } = process.env;
const GR_URL = 'https://goodreads.com';

const grShelfController = {};

grShelfController.getShelfBooks = (req, res, next) => {
  const { userid, accessToken, accessSecret } = req.cookies;
  if (!userid || !accessToken || !accessSecret) return res.redirect('/');
  const { name, page } = req.params;
  const useridParam = `id=${userid}`;
  const shelfParam = `shelf=${name}`;
  const keyParam = `key=${API_KEY}`;
  const pageParam = `page=${page}`;
  const perPageParam = 'per_page=10';
  const shelfURL = `${GR_URL}/review/list?${useridParam}&${shelfParam}&${keyParam}&${pageParam}&${perPageParam}&format=xml`;
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
  let bookColumnValues = '';
  shelfBooks.forEach((book, index) => {
    const simpleBookTitle = book.title.replace(/'/g, "''");
    bookColumnValues += `('${book.id}', '${simpleBookTitle}', '${book.imgURL}')`;
    if (index < shelfBooks.length - 1) bookColumnValues += ',';
  });
  console.log(bookColumnValues);
  const bookInsertQuery = `INSERT INTO books(id, title, imgurl)
    VALUES ${bookColumnValues}
    ON CONFLICT (id)
    DO NOTHING;`;
  db.query(bookInsertQuery)
    .then(() => next())
    .catch((err) =>
      next({
        log: `Error in grShelfController.addBooksToDB: ${err}`,
        message: { err: `grShelfController.addBooksToDB: ${err}` },
      })
    );
};

module.exports = grShelfController;
