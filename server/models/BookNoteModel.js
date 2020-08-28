const { Pool } = require('pg');

// On ElephantSQL created table to store book info:
// CREATE TABLE books (
//   id VARCHAR PRIMARY KEY,
//   title VARCHAR,
//   imgurl VARCHAR
//   );

const URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query: ', text);
    return pool.query(text, params, callback);
  },
};
