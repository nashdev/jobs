require("dotenv").config();
require("knex");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const knex = require("knex")({
  client: "pg",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: "utf8",
  },
});

const log = (str) => {
  process.stderr.write(`${str} \n`);
};

const dropDB = () => {
  log("dropping database");
  knex.raw(`DROP DATABASE IF EXISTS ${DB_NAME};`);
};

const createDB = () => {
  log("creating database");
  knex.raw(`CREATE DATABASE ${DB_NAME};`);
};

const migrateDB = () => {
  log("migrating database");
  knex.migrate.latest({ directory: "./src/server/database/_migrations" });
};

const isEnvFilePopulated = DB_NAME && DB_HOST && DB_PASSWORD && DB_USER;

const run = () => {
  if (!isEnvFilePopulated) {
    log("no .env file found or missing required info");
    process.exit(1);
  }
  Promise.all([dropDB(), createDB(), migrateDB()]).then(() => {
    log("dev database set up");
    process.exit(0);
  });
};

run();
