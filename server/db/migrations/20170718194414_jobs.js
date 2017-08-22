exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("jobs", function(table) {
      table.increments();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.integer("company_id").unsigned().notNullable();
      table.foreign("company_id").references("companies.id");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table
        .enum("status", ["open", "filled", "closed", "expired"])
        .defaultTo("open");
      table
        .enum("type", [
          "temporary",
          "fulltime",
          "parttime",
          "freelance",
          "contract"
        ])
        .defaultTo("fulltime");
      table.boolean("recruiter").notNullable().defaultTo(false);
      table.string("recruiter_agency");
      table.string("location").notNullable();
      table.string("contact_slack");
      table.string("contact_email").notNullable();
      table.string("contact_website");
      table.string("contact_person").notNullable();
      table.integer("experience_range").notNullable();
      table.integer("salary_range").notNullable();
      table.boolean("remote_available").notNullable().defaultTo(false);
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("jobs")]);
};
