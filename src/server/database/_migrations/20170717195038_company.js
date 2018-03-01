exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("companies", function(table) {
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("companies", function(table) {
      table.dropForeign("user_id");
      table.dropColumn("user_id");
    })
  ]);
};
