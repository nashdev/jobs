// Add internship to the Jobs.types enum
// AFAIK the only way to do this is raw SQL, dropping and readding the
// CONSTRAINT
exports.up = function(knex, Promise) {
  return knex.schema.raw(`
      ALTER TABLE "jobs"
      DROP CONSTRAINT "jobs_type_check",
        ADD CONSTRAINT "jobs_type_check"
      CHECK (type IN (
        'temporary',
        'fulltime',
        'parttime',
        'freelance',
        'contract',
        'internship'
      ))
    `);
};

exports.down = function(knex, Promise) {
  return knex.schema.raw(`
      ALTER TABLE "jobs"
      DROP CONSTRAINT "jobs_type_check",
        ADD CONSTRAINT "jobs_type_check"
      CHECK (type IN (
        'temporary',
        'fulltime',
        'parttime',
        'freelance',
        'contract'
      ))
    `);
};
