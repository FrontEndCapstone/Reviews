const { Pool } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool({
  database: 'trailblazers-reviews',
});

pool.query(
  `CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255) );`,
  (err, res) => {
    console.log(err, res);
    pool.end();
  },
);
