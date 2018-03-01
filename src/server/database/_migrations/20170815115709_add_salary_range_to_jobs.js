exports.up = function(knex, Promise) {
  return Promise.all([
    knex("jobs")
    .whereBetween("salary_range", [30000, 49999])
    .update({salary_range: 30}),
    knex("jobs")
    .whereBetween("salary_range", [50000, 79999])
    .update({salary_range: 50}),
    knex("jobs")
    .whereBetween("salary_range", [80000, 99999])
    .update({salary_range: 80}),
    knex("jobs")
    .whereBetween("salary_range", [100000, 999999])
    .update({salary_range: 100})
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  ]);
};