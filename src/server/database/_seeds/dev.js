exports.seed = (knex, Promise) => {
  Promise.all([
    knex("users")
      .del()
      .then(),
    knex("jobs")
      .del()
      .then(),
    knex("companies")
      .del()
      .then(),
    knex("users").insert([
      {
        id: 1,
        name: "Nashville Developer",
        email: "jobs@nashdev.org",
        location: "Nashville",
        public: true,
        created_at: "NOW()",
        updated_at: "NOW()",
      },
    ]),
    knex("companies").insert([
      {
        id: 1,
        name: "Nashville Company",
        location: "Nashville",
        size: "20",
        description: "We develop software in Nashville.",
        user_id: 1,
        created_at: "NOW()",
        updated_at: "NOW()",
      },
    ]),
    knex("jobs").insert([
      {
        id: 1,
        user_id: 1,
        company_id: 1,
        title: "Half Stack Web Developer",
        description: "Pick your favorite.",
        short_description: "short description",
        status: "open",
        type: "fulltime",
        recruiter: false,
        location: "Nashville",
        experience_range: 100,
        salary_range: 40000,
        remote_available: true,
        created_at: "NOW()",
        updated_at: "NOW()",
      },
    ]),
  ]);
};
