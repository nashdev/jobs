
exports.up = function(knex, Promise) {
  
};

exports.down = function(knex, Promise) {
  
};


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", function(table) {
      table.renameColumn("salary_range", "lower_salary");
      table.integer("upper_salary").notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", function(table) {
      table.renameColumn("lower_salary", "salary_range");
      table.dropColumn("upper_salary");
    })
  ]);
};
