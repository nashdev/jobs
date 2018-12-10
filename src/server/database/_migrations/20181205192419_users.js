exports.up = async function up(knex) {
  return knex.schema.table("users", (table) => {
    table.string("facebook");
    table.string("twitter");
    table.string("github");
    table.string("linkedin");
    table.text("resume");
    table
      .boolean("public")
      .notNullable()
      .defaultTo(false);
    table
      .boolean("available")
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = async function down(knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("facebook");
    table.dropColumn("twitter");
    table.dropColumn("github");
    table.dropColumn("linkedin");
    table.dropColumn("resume");
    table.dropColumn("public");
    table.dropColumn("available");
  });
};
