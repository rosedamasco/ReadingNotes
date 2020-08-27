const { OAuth } = require('oauth');
const db = require('../models/BookNoteModel');

const { API_KEY, API_SECRET } = process.env;
const GR_URL = 'https://goodreads.com';
const CALLBACK_URL = 'http://localhost:3434/oauth/callback';

const oauthController = {};

const requestURL = `${GR_URL}/oauth/request_token`;
const accessURL = `${GR_URL}/oauth/access_token`;
const version = '1.0';
const encryption = 'HMAC-SHA1';
const OAUTH = new OAuth(
  requestURL,
  accessURL,
  API_KEY,
  API_SECRET,
  version,
  CALLBACK_URL,
  encryption
);
const REQUEST_TOKEN = {};
const ACCESS_TOKEN = {};

oauthController.getRequestToken = (req, res, next) => {
  OAUTH.getOAuthRequestToken((err, reqToken, reqTokenSecret, results) => {
    if (err) {
      return next({
        log: `Error in oauthController.getRequestToken: ${err}`,
        message: { err: `Error in oauthController.getRequestToken: ${err}` },
      });
    }

    const url = `${GR_URL}/oauth/authorize?oauth_token=${reqToken}&oauth_callback=${CALLBACK_URL}`;
    REQUEST_TOKEN.token = reqToken;
    REQUEST_TOKEN.secret = reqTokenSecret;

    return res.json(url);
  });
};

oauthController.getAccessToken = (req, res, next) => {
  if (req.query.authorize === '0') return res.redirect('/');

  OAUTH.getOAuthAccessToken(
    REQUEST_TOKEN.token,
    REQUEST_TOKEN.secret,
    1,
    (err, accessToken, accessTokenSecret, results) => {
      if (err) {
        return next({
          log: `Error in oauthController.getAccessToken: ${err}`,
          message: { err: `Error in oauthController.getAccessToken: ${err}` },
        });
      }
      ACCESS_TOKEN.token = accessToken;
      ACCESS_TOKEN.secret = accessTokenSecret;
      return next();
    }
  );
};

oauthController.getUserInfo = (req, res, next) => {
  OAUTH.get(
    `${GR_URL}/api/auth_user`,
    ACCESS_TOKEN.token,
    ACCESS_TOKEN.secret,
    (err, data, response) => {
      if (err) {
        return next({
          log: `Error in oauthController.getUserInfo: ${err}`,
          message: { err: `Error in oauthController.getUserInfo: ${err}` },
        });
      }
      res.locals.xmlData = data;
      return next();
    }
  );
};

oauthController.parseUserInfo = (req, res, next) => {
  const userObj = res.locals.xmlObj;
  const user = {
    id: userObj.GoodreadsResponse.user[0].$.id,
    name: userObj.GoodreadsResponse.user[0].name[0],
  };
  res.locals.user = user;
  return next();
};

oauthController.setUserCookies = (req, res, next) => {
  res.cookie('userid', res.locals.user.id, { maxAge: 86400000 });
  res.cookie('username', res.locals.user.name, { httpOnly: true, maxAge: 86400000 });
  res.cookie('accessToken', ACCESS_TOKEN.token, { httpOnly: true, maxAge: 86400000 });
  res.cookie('accessSecret', ACCESS_TOKEN.secret, { httpOnly: true, maxAge: 86400000 });
  return next();
};

oauthController.addUserToDB = (req, res, next) => {
  const tableName = `user${res.locals.user.id}`;
  const userTableExistQuery = `SELECT EXISTS (
    SELECT FROM pg_tables
    WHERE tablename = $1
    );`;
  db.query(userTableExistQuery, [tableName])
    .then((results) => Promise.resolve(results.rows[0].exists))
    .then((tableExists) => {
      // if user table exists, move onto next step
      if (tableExists) {
        return next();
      }
      // if table does not exist, create table for user
      const createUserTableQuery = `CREATE TABLE ${tableName} (
        id SERIAL PRIMARY KEY,
        book_id VARCHAR,
        location INT,
        note VARCHAR,
        timestamp VARCHAR,
        FOREIGN KEY (book_id) REFERENCES books(id)
        );`;
      db.query(createUserTableQuery).then(() => next());
    })
    .catch((err) =>
      next({
        log: `Error in oauthController.addUserToDB: ${err}`,
        message: { err: `Error in oauthController.addUserToDB: ${err}` },
      })
    );
};

module.exports = { oauthController, OAUTH };
