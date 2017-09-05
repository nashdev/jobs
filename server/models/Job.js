let Bookshelf = require("../config/bookshelf");
/*
+------------------+--------------------------+----------------------------------------------------+
| Column           | Type                     | Modifiers                                          |
|------------------+--------------------------+----------------------------------------------------|
| id               | integer                  |  not null default nextval('jobs_id_seq'::regclass) |
| user_id          | integer                  |  not null                                          |
| company_id       | integer                  |  not null                                          |
| title            | character varying(255)   |  not null                                          |
| description      | text                     |  not null                                          |
| status           | text                     |  default 'open'::text                              |
| type             | text                     |  default 'fulltime'::text                          |
| recruiter        | boolean                  |  not null default false                            |
| recruiter_agency | character varying(255)   |                                                    |
| location         | character varying(255)   |  not null                                          |
| contact_slack    | character varying(255)   |                                                    |
| contact_email    | character varying(255)   |  not null                                          |
| contact_website  | character varying(255)   |                                                    |
| contact_person   | character varying(255)   |  not null                                          |
| experience_range | integer                  |  not null                                          |
| salary_range     | integer                  |  not null                                          |
| remote_available | boolean                  |  not null default false                            |
| created_at       | timestamp with time zone |                                                    |
| updated_at       | timestamp with time zone |                                                    |
+------------------+--------------------------+----------------------------------------------------+
Indexes:
    "jobs_pkey" PRIMARY KEY, btree (id)
Check constraints:
    "jobs_status_check" CHECK (status = ANY (ARRAY['open'::text, 'filled'::text, 'closed'::text, 'expired'::text]))    "jobs_type_check" CHECK (type = ANY (ARRAY['temporary'::text, 'fulltime'::text, 'part
Foreign-key constraints:
    "jobs_company_id_foreign" FOREIGN KEY (company_id) REFERENCES companies(id)
    "jobs_user_id_foreign" FOREIGN KEY (user_id) REFERENCES users(id)
*/

const Job = Bookshelf.Model.extend({
  tableName: "jobs",
  hasTimestamps: true,
  format: function(attributes) {
    // Remove @ from slack handle if present
    if (attributes.contact_slack) {
      attributes.contact_slack = attributes.contact_slack.replace("@", "");
    }
    return attributes;
  },
  user: function() {
    return this.belongsTo("User");
  },
  company: function() {
    return this.belongsTo("Company");
  }
});

module.exports = Bookshelf.model("Job", Job);
