const Knex = require("knex");
const Utils = require("./utils");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const knexFactory = ({ dbName = "postgres" } = {}) => {
  const knexOpts = {
    client: "pg",
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: dbName,
      charset: "utf8",
    },
  };

  return Knex(knexOpts);
};

const log = (str, level = "info") => {
  Utils.logMessage(str, level);
};

const logError = (str) => {
  log(str, "error");
};

const dropDB = async (knex) => {
  log("dropping database");
  await knex.raw(`DROP DATABASE IF EXISTS ${DB_NAME};`);
};

const createDB = async (knex) => {
  log("creating database");
  await knex.raw(`CREATE DATABASE ${DB_NAME};`);
};

const migrateDB = async (knex) => {
  log("migrating database");
  await knex.migrate.latest({ directory: "./src/server/database/_migrations" });
};

const seedDB = async (knex) => {
  log("seeding database");
  await knex.seed.run({ directory: "./src/server/database/_seeds" });
};

const resetDB = async () => {
  const knex = knexFactory();
  await dropDB(knex);
  await createDB(knex);
  knex.destroy();
};

const primeDB = async () => {
  const knex = knexFactory({ dbName: DB_NAME });
  await migrateDB(knex);
  await seedDB(knex);
};

const isEnvFilePopulated = DB_NAME && DB_HOST && DB_PASSWORD && DB_USER;

const run = async () => {
  if (!isEnvFilePopulated) {
    logError("no .env file found or missing required info");
    process.exit(1);
  }

  try {
    await resetDB();
    await primeDB();
    log("dev database set up");
    process.exit(0);
  } catch (error) {
    logError("Error setting up db");
    logError(error);
    process.exit(1);
  }
};

run();
