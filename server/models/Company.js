var bookshelf = require("../config/bookshelf");

var Company = bookshelf.Model.extend({
  tableName: "companies",
  hasTimestamps: true
});

module.exports = Company;
