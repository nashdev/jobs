var Bookshelf = require("../config/bookshelf");
/*
+------------------+--------------------------+-----------------------+
| Column           | Type                     | Modifiers             |
|------------------+--------------------------+-----------------------|
| id               | integer                  |                       |
| name             | character varying(255)   |  unique               |
| location         | character varying(255)   |                       |
| phone            | character varying(255)   |                       |
| size             | text                     |                       |
| description      | text                     |                       |
| user_id          | integer                  |  references user.id   |
+------------------+--------------------------+-----------------------+
*/

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
