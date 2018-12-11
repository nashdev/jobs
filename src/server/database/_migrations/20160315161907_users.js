exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("users", (table) => {
      table.increments();
      table.string("name");
      table.string("email").unique();
      table.string("location");
      table.string("website");
      table.string("picture");
      table.string("slackId");
      table.string("slackHandle");
      table.timestamps();
    }),
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([knex.schema.dropTable("users")]);
};
