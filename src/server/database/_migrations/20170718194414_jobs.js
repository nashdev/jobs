exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("jobs", function(table) {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable();
      table.foreign("user_id").references("users.id");
      table
        .integer("company_id")
        .unsigned()
        .notNullable();
      table.foreign("company_id").references("companies.id");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.text("short_description").notNullable();
      table
        .enum("status", ["open", "filled", "closed", "expired"])
        .defaultTo("open");
      table
        .enum("type", [
          "internship",
          "temporary",
          "fulltime",
          "parttime",
          "freelance",
          "contract",
        ])
        .defaultTo("fulltime");
      table
        .boolean("recruiter")
        .notNullable()
        .defaultTo(false);
      table.string("recruiter_agency");
      table.string("location").notNullable();
      table.string("website");
      table.string("experience_range").notNullable();
      table.string("salary_range").notNullable();
      table
        .boolean("remote_available")
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("jobs")]);
};
