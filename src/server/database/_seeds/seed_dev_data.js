var bcrypt = require("bcrypt-nodejs");

exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('jobs').del().then(),
    knex('companies').del().then(),
    knex('users').del().then(),
    new Promise(function (resolve, reject) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash('nashdev', salt, null, function (err, hash) {
          return knex('users').insert([
            {
              id: 1,
              name: 'Nashville Developer',
              email: 'jobs@nashdev.org',
              location: 'Nashville',
              password: hash
            },
          ]).then(function () {
            return knex('companies').insert([
              {
                id: 1,
                name: 'Nashville Company',
                location: 'Nashville',
                phone: '(615) 555-5555',
                size: '20',
                description: 'We develop software in Nashville.',
                user_id: 1
              },
            ])
          })
            .then(function () {
              return knex('jobs').insert([
                {
                  id: 1,
                  user_id: 1,
                  company_id: 1,
                  title: "Half Stack Web Developer",
                  description: "Pick your favorite.",
                  status: "open",
                  type: "fulltime",
                  recruiter: false,
                  location: "Nashville",
                  contact_email: "jobs@nashdev.org",
                  contact_website: "jobs.nashdev.org",
                  contact_person: "Dev Jobs",
                  experience_range: 100,
                  salary_range: 40000,
                  remote_available: true
                }
              ])
            })
        })
      })
    })
  ])
}


