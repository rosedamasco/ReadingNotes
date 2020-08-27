const db = require('../models/BookNoteModel');

const BookController = {};

BookController.getBook = (req, res, next) => {
  const { id } = req.params;
  const bookQuery = `SELECT title, imgURL FROM books 
  WHERE id=$1 
  LIMIT 1;`;
  db.query(bookQuery, [id])
    .then((results) => {
      const book = results.rows[0];
      res.locals.book = {
        title: book.title,
        imgURL: book.imgurl,
      };
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in BookController.getBook: ${err}`,
        message: { err: `Error in BookController.getBook: ${err}` },
      })
    );
};

BookController.getNotes = (req, res, next) => {
  const { userid } = req.cookies;
  const { id } = req.params;
  const tableName = `user${userid}`;
  const notesQuery = `SELECT location, note, date FROM ${tableName}
  WHERE book_id=$1;`;
  db.query(notesQuery, [id])
    .then((results) => {
      const notes = results.rows;
      res.locals.notes = notes;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in BookController.getNotes: ${err}`,
        message: { err: `Error in BookController.getNotes: ${err}` },
      })
    );
};

BookController.addNote = (req, res, next) => {
  const { userid } = req.cookies;
  const { id, location, note, date } = req.body;
  const tableName = `user${userid}`;
  const insertNoteQuery = `INSERT INTO ${tableName}(book_id, location, note, date)
  VALUES($1, $2, $3, $4);`;
  db.query(insertNoteQuery, [id, location, note, date])
    .then(() => res.status(200).end())
    .catch((err) =>
      next({
        log: `Error in BookController.addNote: ${err}`,
        message: { err: `Error in BookController.addNote: ${err}` },
      })
    );
};

module.exports = BookController;
