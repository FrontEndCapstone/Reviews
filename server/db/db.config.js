const { Pool } = require('pg');
const faker = require('faker');

const db = new Pool({ database: 'trailblazers_reviews' });

const createQueryStr = `
  CREATE TABLE reviews (
    id serial, review_id int, rating int,
    reviewer varchar(255), title varchar(255), body text,
    recommend boolean, helpful int, unhelpful int,
    PRIMARY KEY (id)
  );`;

const initReviewsTable = () => {
  const setupTablePromise = new Promise((res, rej) => {
    db.connect((connectionErr, client) => {
      client
        .query('BEGIN')
        .then(() => {
          client.query('DROP TABLE reviews');
        })
        .then(() => {
          client.query(createQueryStr);
        })
        .then(() => {
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
            client.query(insertQuery.text, insertQuery.values, () => {
              if (i === 99) {
                client.query('COMMIT', () => {
                  client.end();
                  res(true);
                });
              }
            });
          }
        });
    });
  });

  return setupTablePromise;
};

initReviewsTable();

module.exports = initReviewsTable;
