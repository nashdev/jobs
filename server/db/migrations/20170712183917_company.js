exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("companies", function(table) {
      table.increments();
      table.string("name").unique();
      table.string("location");
      table.string("phone");
      table.integer("size");
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("companies")]);
};
