export const createJob = (id = 1, name = "Example Job") => ({
  links: { self: "http://localhost:3000/api/jobs" },
  included: [
    {
      type: "companies",
      id: "27",
      attributes: {
        name: "Example Company 7",
        location: "Nashville, TN",
        phone: "615-555-5555",
        size: 200,
        created_at: "2017-09-30T17:00:48.469Z",
        updated_at: "2017-09-30T17:00:48.469Z",
        description: "Example company description",
        user_id: 1
      },
      links: { self: "http://localhost:3000/api/companies/27" }
    },
    {
      type: "users",
      id: "1",
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
    }
  ],
  data: {
    type: "jobs",
    id: id,
    links: { self: "http://localhost:3000/api/jobs/" + id },
    attributes: {
      user_id: 1,
      company_id: 27,
      title: "Example Job",
      description: "Job Details",
      status: "open",
      type: "fulltime",
      recruiter: false,
      recruiter_agency: null,
      location: "Nashville, TN",
      contact_slack: "slack_user",
      contact_email: "user1@example.com",
      contact_website: "http://example.com",
      contact_person: "Example User",
      experience_range: 100,
      salary_range: 30,
      remote_available: false,
      created_at: "2017-09-30T18:22:16.694Z",
      updated_at: "2017-09-30T18:22:16.694Z",
      contact_phone: "615-555-5555"
    },
    relationships: {
      company: {
        data: { type: "companies", id: "27" },
        links: {
          self: "http://localhost:3000/api/jobs/44/relationships/company",
          related: "http://localhost:3000/api/jobs/44/company"
        }
      },
      user: {
        data: { type: "users", id: "1" },
        links: {
          self: "http://localhost:3000/api/jobs/44/relationships/user",
          related: "http://localhost:3000/api/jobs/44/user"
        }
      }
    }
  }
});

export const getCollection = () => ({
  links: {
    self: "http://localhost:3000/api/jobs",
    first: "http://localhost:3000/api/jobs?page[limit]=9&page[offset]=0",
    prev: "http://localhost:3000/api/jobs?page[limit]=9&page[offset]=0",
    next: "http://localhost:3000/api/jobs?page[limit]=9&page[offset]=18",
    last: "http://localhost:3000/api/jobs?page[limit]=1&page[offset]=27"
  },
  data: [
    {
      type: "jobs",
      id: 2,
      links: { self: "http://localhost:3000/api/jobs/44" },
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job",
        description: "Job Details",
        status: "open",
        type: "fulltime",
        recruiter: false,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 100,
        salary_range: 30,
        remote_available: false,
        created_at: "2017-09-30T18:22:16.694Z",
        updated_at: "2017-09-30T18:22:16.694Z",
        contact_phone: "615-555-5555"
      },
      relationships: {
        company: {
          data: { type: "companies", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/company",
            related: "http://localhost:3000/api/jobs/44/company"
          }
        },
        user: {
          data: { type: "users", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/user",
            related: "http://localhost:3000/api/jobs/44/user"
          }
        }
      }
    },
    {
      type: "jobs",
      id: 2,
      links: { self: "http://localhost:3000/api/jobs/44" },
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job",
        description: "Job Details",
        status: "open",
        type: "fulltime",
        recruiter: false,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 100,
        salary_range: 30,
        remote_available: false,
        created_at: "2017-09-30T18:22:16.694Z",
        updated_at: "2017-09-30T18:22:16.694Z",
        contact_phone: "615-555-5555"
      },
      relationships: {
        company: {
          data: { type: "companies", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/company",
            related: "http://localhost:3000/api/jobs/44/company"
          }
        },
        user: {
          data: { type: "users", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/user",
            related: "http://localhost:3000/api/jobs/44/user"
          }
        }
      }
    },
    {
      type: "jobs",
      id: 3,
      links: { self: "http://localhost:3000/api/jobs/44" },
      attributes: {
        user_id: 1,
        company_id: 1,
        title: "Example Job",
        description: "Job Details",
        status: "open",
        type: "fulltime",
        recruiter: false,
        recruiter_agency: null,
        location: "Nashville, TN",
        contact_slack: "slack_user",
        contact_email: "user1@example.com",
        contact_website: "http://example.com",
        contact_person: "Example User",
        experience_range: 100,
        salary_range: 30,
        remote_available: false,
        created_at: "2017-09-30T18:22:16.694Z",
        updated_at: "2017-09-30T18:22:16.694Z",
        contact_phone: "615-555-5555"
      },
      relationships: {
        company: {
          data: { type: "companies", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/company",
            related: "http://localhost:3000/api/jobs/44/company"
          }
        },
        user: {
          data: { type: "users", id: "1" },
          links: {
            self: "http://localhost:3000/api/jobs/44/relationships/user",
            related: "http://localhost:3000/api/jobs/44/user"
          }
        }
      }
    }
  ],
  included: [
    {
      type: "companies",
      id: "1",
      attributes: {
        name: "Example Company",
        location: "Nashville, TN",
        phone: "615-555-5555",
        size: 200,
        created_at: "2017-09-30T17:00:48.469Z",
        updated_at: "2017-09-30T17:00:48.469Z",
        description: "Example company description",
        user_id: 1
      },
      links: { self: "http://localhost:3000/api/companies/27" }
    },
    {
      type: "users",
      id: "1",
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
      links: { self: "http://localhost:3000/api/users/1" },
      relationships: {}
    },
    {
      type: "companies",
      id: "21",
      attributes: {
        name: "Electron Dance",
        location: "Nashville, TN",
        phone: "615-555-5555",
        size: 200,
        created_at: "2017-09-02T17:17:37.446Z",
        updated_at: "2017-09-02T17:17:37.446Z",
        description: "Electron dance co",
        user_id: 1
      },
      links: { self: "http://localhost:3000/api/companies/21" },
      relationships: {}
    }
  ]
});

export const getJob = (id = 1, name = "Example Job") => ({
  links: { self: "http://localhost:3000/api/jobs" },
  included: [
    {
      type: "users",
      id: "1",
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
      type: "companies",
      id: "2",
      attributes: {
        name: "Example Company 7",
        location: "Nashville, TN",
        phone: "615-555-5555",
        size: 200,
        created_at: "2017-09-30T17:00:48.469Z",
        updated_at: "2017-09-30T17:00:48.469Z",
        description: "Example company description",
        user_id: 1
      },
      links: { self: "http://localhost:3000/api/companies/27" }
    }
  ],
  data: {
    type: "jobs",
    id: id,
    links: { self: "http://localhost:3000/api/jobs/44" },
    attributes: {
      user_id: 1,
      company_id: 2,
      title: name,
      description: "Job Details",
      status: "open",
      type: "fulltime",
      recruiter: false,
      recruiter_agency: null,
      location: "Nashville, TN",
      contact_slack: "slack_user",
      contact_email: "user1@example.com",
      contact_website: "http://example.com",
      contact_person: "Example User",
      experience_range: 100,
      salary_range: 30,
      remote_available: false,
      created_at: "2017-09-30T18:22:16.694Z",
      updated_at: "2017-09-30T18:22:16.694Z",
      contact_phone: "615-555-5555"
    },
    relationships: {
      user: {
        data: { type: "users", id: "1" },
        links: {
          self: "http://localhost:3000/api/jobs/44/relationships/user",
          related: "http://localhost:3000/api/jobs/44/user"
        }
      },
      company: {
        data: { type: "companies", id: "2" },
        links: {
          self: "http://localhost:3000/api/jobs/44/relationships/company",
          related: "http://localhost:3000/api/jobs/44/company"
        }
      }
    }
  }
});
