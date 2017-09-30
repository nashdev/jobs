export const createCompany = (id = 1, name = "Example Company") => ({
  links: { self: "http://localhost:3000/api/companies" },
  data: {
    type: "companies",
    id: id,
    links: { self: `http://localhost:3000/api/companies/${id}` },
    attributes: {
      name: name,
      phone: "615-555-5555",
      location: "Nashville, TN",
      size: "200",
      description: "Example company description",
      user_id: 1,
      updated_at: "2017-09-30T17:00:48.469Z",
      created_at: "2017-09-30T17:00:48.469Z"
    }
  }
});

export const getCollection = () => ({
  links: { self: "http://localhost:3000/api/companies" },
  data: [
    {
      type: "companies",
      id: 1,
      links: { self: "http://localhost:3000/api/companies/1" },
      attributes: {
        name: "Example Company",
        location: "Nashville, TN",
        phone: "615-555-5555",
        size: 200,
        created_at: "2017-09-02T17:17:37.446Z",
        updated_at: "2017-09-02T17:17:37.446Z",
        description: "Example Company Description",
        user_id: 1
      },
      relationships: {
        user: {
          data: { type: "users", id: 1 },
          links: {
            self: "http://localhost:3000/api/companies/21/relationships/user",
            related: "http://localhost:3000/api/companies/21/user"
          }
        }
      }
    },
    {
      type: "companies",
      id: 2,
      links: { self: "http://localhost:3000/api/companies/2" },
      attributes: {
        name: "Example Company 2",
        location: "Nashville, TN",
        phone: "615-555-5559",
        size: 75,
        created_at: "2017-08-30T22:13:08.358Z",
        updated_at: "2017-08-30T22:13:08.358Z",
        description: "Example Company Description",
        user_id: 2
      },
      relationships: {
        user: {
          data: { type: "users", id: 2 },
          links: {
            self: "http://localhost:3000/api/companies/2/relationships/user",
            related: "http://localhost:3000/api/companies/2/user"
          }
        }
      }
    },
    {
      type: "companies",
      id: 3,
      links: { self: "http://localhost:3000/api/companies/3" },
      attributes: {
        name: "Example Company 3",
        location: "Nashville TN",
        phone: "615-555-5552",
        size: 100,
        created_at: "2017-08-18T19:30:50.611Z",
        updated_at: "2017-08-18T19:30:50.611Z",
        description: "Example Company 3",
        user_id: 3
      },
      relationships: {
        user: {
          data: { type: "users", id: 3 },
          links: {
            self: "http://localhost:3000/api/companies/3/relationships/user",
            related: "http://localhost:3000/api/companies/3/user"
          }
        }
      }
    }
  ],
  included: [
    {
      type: "users",
      id: 1,
      attributes: {
        name: "Example User 1",
        email: "user1@example.com",
        location: "Nashville, TN",
        website: null,
        picture: "https://avatars1.githubusercontent.com/u/512548?v=4",
        facebook: null,
        github: null,
        twitter: null,
        google: null,
        vk: null,
        created_at: "2017-08-02T00:37:21.654Z",
        updated_at: "2017-09-27T21:45:07.989Z",
        gravatar:
          "https://gravatar.com/avatar/47deed7bd4f31aae98d60ae10101c133?s=200&d=retro"
      },
      links: { self: "http://localhost:3000/api/users/1" },
      relationships: {}
    },
    {
      type: "users",
      id: 2,
      attributes: {
        name: "Example User 2",
        email: "user2@example.com",
        location: "Nashville, TN",
        website: null,
        picture: "https://avatars1.githubusercontent.com/u/512548?v=4",
        facebook: null,
        github: null,
        twitter: null,
        google: null,
        vk: null,
        created_at: "2017-08-02T00:37:21.654Z",
        updated_at: "2017-09-27T21:45:07.989Z",
        gravatar:
          "https://gravatar.com/avatar/47deed7bd4f31aae98d60ae10101c133?s=200&d=retro"
      },
      links: { self: "http://localhost:3000/api/users/2" },
      relationships: {}
    },
    {
      type: "users",
      id: 3,
      attributes: {
        name: "Example User 3",
        email: "user3@example.com",
        location: "Nashville, TN",
        website: null,
        picture: "https://avatars1.githubusercontent.com/u/512548?v=4",
        facebook: null,
        github: null,
        twitter: null,
        google: null,
        vk: null,
        created_at: "2017-08-02T00:37:21.654Z",
        updated_at: "2017-09-27T21:45:07.989Z",
        gravatar:
          "https://gravatar.com/avatar/47deed7bd4f31aae98d60ae10101c133?s=200&d=retro"
      },
      links: { self: "http://localhost:3000/api/users/2" },
      relationships: {}
    }
  ]
});

export const getCompany = (id = 1, name = "Example Company") => ({
  links: { self: "http://localhost:3000/api/companies" },
  included: [
    {
      type: "users",
      id: 1,
      attributes: {
        name: "Example User",
        email: "user1@example.com",
        location: "Nashville, TN",
        website: null,
        picture: "https://avatars1.githubusercontent.com/u/512548?v=4",
        facebook: null,
        github: null,
        twitter: null,
        google: null,
        vk: null,
        created_at: "2017-08-02T00:37:21.654Z",
        updated_at: "2017-09-27T21:45:07.989Z",
        gravatar:
          "https://gravatar.com/avatar/47deed7bd4f31aae98d60ae10101c133?s=200&d=retro"
      },
      links: { self: "http://localhost:3000/api/users/1" }
    },
    {
      type: "jobs",
      id: 2,
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job 2",
        description: "Example Description",
        status: "open",
        type: "fulltime",
        recruiter: false,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 200,
        salary_range: 50,
        remote_available: true,
        created_at: "2017-08-02T15:53:01.194Z",
        updated_at: "2017-08-02T15:53:01.194Z",
        contact_phone: "615-555-5555"
      },
      links: { self: "http://localhost:3000/api/jobs/2" }
    },
    {
      type: "jobs",
      id: 3,
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job 3",
        description: "Example Description",
        status: "open",
        type: "fulltime",
        recruiter: false,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 300,
        salary_range: 50,
        remote_available: false,
        created_at: "2017-08-02T19:29:38.087Z",
        updated_at: "2017-08-07T16:20:21.202Z",
        contact_phone: "615-555-5555"
      },
      links: { self: "http://localhost:3000/api/jobs/3" }
    },
    {
      type: "jobs",
      id: 1,
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job 1",
        description: "Example  Description",
        status: "open",
        type: "fulltime",
        recruiter: true,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 300,
        salary_range: 80,
        remote_available: true,
        created_at: "2017-08-02T00:50:32.563Z",
        updated_at: "2017-09-02T21:26:07.634Z",
        contact_phone: "615-555-5555"
      },
      links: { self: "http://localhost:3000/api/jobs/1" }
    }
  ],
  data: {
    type: "companies",
    id: id,
    links: { self: "http://localhost:3000/api/companies/" + id },
    attributes: {
      name: name,
      location: "Nashville, TN",
      phone: "615-555-5555",
      size: 200,
      created_at: "2017-08-02T00:38:54.962Z",
      updated_at: "2017-09-30T04:41:49.441Z",
      description: "Example Description",
      user_id: 1
    },
    relationships: {
      user: {
        data: { type: "users", id: 1 },
        links: {
          self: "http://localhost:3000/api/companies/1/relationships/user",
          related: "http://localhost:3000/api/companies/1/user"
        }
      },
      jobs: {
        data: [
          { type: "jobs", id: 2 },
          { type: "jobs", id: 3 },
          { type: "jobs", id: 1 }
        ],
        links: {
          self: "http://localhost:3000/api/companies/1/relationships/jobs",
          related: "http://localhost:3000/api/companies/1/jobs"
        }
      }
    }
  }
});
