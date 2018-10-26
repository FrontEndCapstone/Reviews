const { Pool } = require('pg');
const faker = require('faker');

const db = new Pool({ database: 'trailblazers-reviews' });

const createQueryStr = `
  CREATE TABLE reviews (
    id int GENERATED always AS identity, review_id int, rating int,
    reviewer varchar(255), title varchar(255), body text,
    recommend boolean, helpful int, unhelpful int,
    PRIMARY KEY (id)
  );`;

const initReviewsTable = () => {
  db.connect((connectionErr, client, done) => {
    client.query('BEGIN', err => {
      client.query('DROP TABLE reviews');
      client.query(createQueryStr, (err, res) => {
        for (let i = 1; i < 100; i++) {
          if (Math.random() < 0.9 && i < 100) {
            i--;
          }
          const insertQuery = {
            text: `
INSERT INTO reviews (
  review_id, rating, reviewer, title, body, recommend, helpful, unhelpful
) VALUES (
     $1,       $2,      $3,      $4,   $5,    $6,        $7,       $8
)`,
            values: [
              i,
              faker.random.number({ max: 3, min: 1 }) +
                faker.random.number({ max: 2, min: 0 }),
              faker.internet.userName(),
              faker.lorem.sentence(),
              faker.lorem.paragraph(5),
              faker.random.boolean(),
              faker.random.number(47),
              faker.random.number(22),
            ],
          };
          client.query(insertQuery.text, insertQuery.values, (err, res) => {
            // console.log('i: ', i);
            if (i === 99) {
              client.query('COMMIT', err => {
                if (err) {
                  console.error('Error committing transaction', err.stack);
                }
                done();
              });
            }
          });
        }
      });
    });
  });
};

initReviewsTable();

module.exports = initReviewsTable;
