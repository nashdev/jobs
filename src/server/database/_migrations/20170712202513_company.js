exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("companies", function(table) {
      table.text("description");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("companies", function(table) {
      table.dropColumn("description");
    })
  ]);
};
