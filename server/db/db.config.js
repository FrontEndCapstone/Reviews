const { Pool } = require('pg');
const faker = require('faker');

// pools will use environment variables
// for connection information
const pool = new Pool({
  database: 'trailblazers-reviews',
});

pool.query('DROP TABLE reviews', () => {
  pool.query(
    `CREATE TABLE reviews (
      id int GENERATED always AS identity,
      review_id int,
      rating int,
      reviewer varchar(255),
      title varchar(255),
      body text,
      would_recommend boolean,
      helpful_yes int,
      helpful_no int,
      PRIMARY KEY (id)
    );`,
    () => {
      for (let i = 1; i <= 100; i++) {
        if (Math.random() < 0.9) {
          i--;
        }
        const query = {
          name: 'fetch-user',
          text: `
        INSERT INTO reviews (
          review_id,
          rating,
          reviewer,
          title,
          body,
          would_recommend,
          helpful_yes,
          helpful_no
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          TRUE,
          47,
          0
        )
        `,
          values: [
            i,
            1,
            faker.internet.userName(),
            faker.lorem.sentence(),
            faker.lorem.paragraph(5),
          ],
        };

        pool.query(query, () => {
          if (i === 100) {
            pool.end();
          }
        });
      }
    },
  );
});
