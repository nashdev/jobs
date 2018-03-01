exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function(table) {
      table.dropColumn("password");
      table.dropColumn("passwordResetToken");
      table.dropColumn("passwordResetExpires");
      table.dropColumn("facebook");
      table.dropColumn("github");
      table.dropColumn("twitter");
      table.dropColumn("google");
      table.dropColumn("vk");
      table.string("slackId");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("users", function(table) {
      table.string("password");
      table.string("passwordResetToken");
      table.string("passwordResetExpires");
      table.string("facebook");
      table.string("github");
      table.string("twitter");
      table.string("google");
      table.string("vk");
      table.dropColumn("slackId");
    })
  ]);
};
