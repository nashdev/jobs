const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: './src/server/database/_migrations',
  },
  seeds: {
    directory: './src/server/database/_seeds',
  },
  debug: process.env.KNEX_DEBUG || false,
};
