var Bookshelf = require("../config/bookshelf");

var Company = Bookshelf.Model.extend(
  {
    tableName: "companies",
    hasTimestamps: true,
    user: function() {
      return this.belongsTo("User");
    },
    jobs: function() {
      return this.hasMany("Job");
    }
  },
  {
    dependents: ["jobs"]
  }
);

module.exports = Bookshelf.model("Company", Company);
