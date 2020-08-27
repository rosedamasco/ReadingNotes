const superagent = require('superagent');

const { API_KEY } = process.env;

const grShelvesController = {};

grShelvesController.getShelves = (req, res, next) => {
  const { userid } = req.cookies;
  if (!userid) return res.redirect('/');
  superagent
    .get('https://www.goodreads.com/shelf/list.xml')
    .query({ user_id: userid })
    .query({ key: API_KEY })
    .buffer()
    .type('xml')
    .end((err, xmlResponse) => {
      if (err) {
        return next({
          log: `Error in grShelvesController.getShelves: ${err}`,
          message: { err: `Error in grShelvesController.getShelves: ${err}` },
        });
      }
      res.locals.xmlData = xmlResponse.text;
      return next();
    });
};

grShelvesController.parseShelves = (req, res, next) => {
  const { xmlObj } = res.locals;
  const shelvesObj = xmlObj.GoodreadsResponse.shelves[0].user_shelf;
  const parsedShelves = [];
  shelvesObj.forEach((shelf) => {
    const shelfInfo = {
      id: shelf.id[0]._,
      name: shelf.name[0],
      bookCount: shelf.book_count[0]._,
    };
    parsedShelves.push(shelfInfo);
  });
  res.locals.shelves = parsedShelves;
  return next();
};

module.exports = grShelvesController;
