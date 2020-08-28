const express = require('express');
const xmlController = require('../controllers/xmlController');
const grShelvesController = require('../controllers/grShelvesController');
const grShelfController = require('../controllers/grShelfController');
const BookController = require('../controllers/BookController');

const router = express.Router();

router.get(
  '/shelves',
  grShelvesController.getShelves,
  xmlController.parseXML,
  grShelvesController.parseShelves,
  (req, res) => res.status(200).json({ shelves: [...res.locals.shelves] })
);

router.get(
  '/shelf/:name/:page',
  grShelfController.getShelfBooks,
  xmlController.parseXML,
  grShelfController.parseShelfBooks,
  grShelfController.addBooksToDB,
  (req, res) => res.status(200).json({ shelfBooks: [...res.locals.shelfBooks] })
);

router.get('/book/:id', BookController.getBook, BookController.getNotes, (req, res) => {
  res.status(200).json({ book: { ...res.locals.book }, notes: [...res.locals.notes] });
});

router.post('/book', BookController.addNote);

module.exports = router;
