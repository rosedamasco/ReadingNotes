const { parseString } = require('xml2js');

const xmlController = {};

xmlController.parseXML = (req, res, next) => {
  parseString(res.locals.xmlData, (err, object) => {
    if (err) {
      return next({
        log: `Error in xmlController.parseXML, parseString: ${err}`,
        message: { err: `Error in xmlController.parseXML, parseString: ${err}` },
      });
    }
    res.locals.xmlObj = object;
    return next();
  });
};

module.exports = xmlController;
