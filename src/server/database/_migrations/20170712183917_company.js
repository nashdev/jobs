exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("companies", function(table) {
      table.increments();
      table.string("name").unique();
      table.string("location");
      table.integer("size");
      table.string("banner");
      table.string("picture");
      table.string("facebook");
      table.string("twitter");
      table.string("github");
      table.string("linkedin");
      table.text("short_description");
      table.text("description");
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("companies")]);
};
