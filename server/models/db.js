/* eslint-disable no-console */
import 'dotenv/config';
import pg from 'pg';

const { NODE_ENV } = process.env;
const env = NODE_ENV === 'test' || NODE_ENV === 'dev' ? `_${NODE_ENV}`.toUpperCase() : '';

const pool = new pg.Pool({
  connectionString: process.env[`DATABASE_URL${env}`],
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const dropTables = () => {
  const usersTable = 'DROP TABLE IF EXISTS users;';
  const entriesTable = 'DROP TABLE IF EXISTS entries;';

  const dropTablesQueries = `${entriesTable};${usersTable}`;

  pool
    .query(dropTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const createTables = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(100) NULL,
        password TEXT NOT NULL,
        "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

  const entriesTable = `CREATE TABLE IF NOT EXISTS
      entries(
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(100) NULL,
        "userId" UUID NOT NULL REFERENCES users(id),
        "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;


  const createTablesQueries = `${usersTable}; ${entriesTable}`;

  pool
    .query(createTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

export { dropTables, createTables, pool };

require('make-runnable');
