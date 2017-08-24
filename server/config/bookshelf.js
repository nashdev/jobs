let config = require("../../knexfile");
let knex = require("knex")(config);
let bookshelf = require("bookshelf")(knex);
let cascadeDelete = require("bookshelf-cascade-delete");

bookshelf.plugin("virtuals");
bookshelf.plugin("visibility");
bookshelf.plugin("registry");
bookshelf.plugin("pagination");
bookshelf.plugin(cascadeDelete);

knex.migrate.latest();

module.exports = bookshelf;
