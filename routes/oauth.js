const express = require('express');
const { oauthController } = require('../controllers/oauthController');
const xmlController = require('../controllers/xmlController');

const router = express.Router();

// OAuth login with goodreads
router.get('/login', oauthController.getRequestToken);
router.get(
  '/callback',
  oauthController.getAccessToken,
  oauthController.getUserInfo,
  xmlController.parseXML,
  oauthController.parseUserInfo,
  oauthController.setUserCookies,
  oauthController.addUserToDB,
  (req, res) => res.redirect('/shelves')
);

module.exports = router;
