const goodreads = require('goodreads');
const superagent = require('superagent');
const { parseString } = require('xml2js');

let userToken;
const DEV_KEY = '';
const DEV_SECRET = '';
const gr = new goodreads.client({
  key: DEV_KEY,
  secret: DEV_SECRET,
});

const grController = {};

grController.requestToken = (req, res) => {
  if (req.cookies.userid !== undefined) {
    return res.redirect('/getshelves');
  }
  gr.requestToken(({ oauthToken, oauthTokenSecret, url }) => {
    userToken = { token: oauthToken, tokenSecret: oauthTokenSecret };
    return res.redirect(url);
  });
};

grController.processCallback = (req, res) => {
  if (req.query.authorize === '0') return res.redirect('/');
  const { authorize } = req.query;
  const { token, tokenSecret } = userToken;
  gr.processCallback(token, tokenSecret, authorize, (user) => {
    res.cookie('userid', user.userid, { httpOnly: true });
    res.redirect('/shelves');
    // govif62254@mailrnl.com
    // 123456
    // { username: undefined,
    //   userid: '117385639',
    //   success: 1,
    //   accessToken: 'k2TAXH0m6lhGiWMzAaSYg',
    //   accessTokenSecret: 'gt05iO7M9yveM54Q6c00anIAAkflOXgf30nxdY5h4' }

    // lirabi2450@6mails.com
    // 123456
    // {
    //   "userid": "117390739",
    //   "success": 1,
    //   "accessToken": "7agN0lBW5Iu5rstvcgy0Fg",
    //   "accessTokenSecret": "I5VfxyVUtwoaTpGXcbIW5R1Zo6Gj94kXSRlVFD34s4"
    //   }
  });
};

grController.getShelves = (req, res, next) => {
  if (req.cookies.userid === undefined) {
    return res.redirect('/');
  }
  superagent
    .get(`https://www.goodreads.com/shelf/list.xml?user_id=${req.cookies.userid}&key=${DEV_KEY}`)
    .buffer()
    .type('xml')
    .end((err, xmlResponse) => {
      console.log(xmlResponse.text);
      const xml = xmlResponse.text;
      parseString(xml, (err, object) => {
        const shelveObjs = object.GoodreadsResponse.shelves[0].user_shelf;
        const shelves = [];
        shelveObjs.forEach((shelf) =>
          shelves.push({ name: shelf.name[0], bookCount: parseInt(shelf.book_count[0]._) })
        );
        res.json({ shelves });
        // next();
      });
    });
};

grController.getShelf = (req, res, next) => {
  if (req.cookies.userid === undefined) {
    return res.redirect('/');
  }
  const shelfName = req.params.name;
  superagent
    .get(
      `https://www.goodreads.com/review/list/${req.cookies.userid}.xml?key=${DEV_KEY}&v=2&shelf=${shelfName}`
    )
    .buffer()
    .type('xml')
    .end((err, xmlResponse) => {
      console.log(xmlResponse.text);
      const xml = xmlResponse.text;
      parseString(xml, (err, object) => {
        const bookObjs = object.GoodreadsResponse.reviews[0].review;
        const books = [];
        bookObjs.forEach((book, index) => {
          books.push({
            bookid: book.book[0].id[0]._,
            title: book.book[0].title_without_series[0],
            imgURL: book.book[0].image_url[0],
          });
        });
        res.json({ books });
      });
    });
};

grController.getBook = (req, res, next) => {
  if (req.cookies.userid === undefined) {
    return res.redirect('/');
  }
  const { book } = req.body;
  res.send('You in server book');
};

module.exports = grController;
