exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", function(table) {
      table.string("contact_phone");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", function(table) {
      table.dropColumn("contact_phone");
    })
  ]);
};
