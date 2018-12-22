require("dotenv").config();
require("knex");

const { HOST, USERNAME, PASSWORD } = process.env;
const DATABASE = "nashjobs";

const knex = require("knex")({
  client: "pg",
  connection: {
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    charset: "utf8",
  },
});

const log = (str) => {
  process.stderr.write(`${str} \n`);
};

const dropDB = () => {
  log("dropping database");
  knex.raw(`DROP DATABASE IF EXISTS ${DATABASE};`);
};

const createDB = () => {
  log("creating database");
  knex.raw(`CREATE DATABASE ${DATABASE};`);
};

const migrateDB = () => {
  log("migrating database");
  knex.migrate.latest({ directory: "./src/server/database/_migrations" });
};

const run = () => {
  Promise.all([dropDB(), createDB(), migrateDB()]).then(() => {
    log("dev database set up");
    process.exit(0);
  });
};

run();
