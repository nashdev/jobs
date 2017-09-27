export const createUser = (id, name) => ({
  id: id,
  name: name,
  email: "user@example.com",
  location: "Nashville, TN",
  website: "http://jobs.nashdev.com/",
  picture: null,
  facebook: null,
  github: null,
  twitter: null,
  google: null,
  vk: null,
  created_at: "2017-09-14T16:19:07.018Z",
  updated_at: "2017-09-14T18:17:57.596Z",
  gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro"
});

export const createJobs = () => ({
  jobs: [
    {
      id: 1,
      title: "Example Job",
      user_id: 1,
      user: createUser(1)
    },
    {
      id: 2,
      title: "Example Job 2",
      user_id: 2,
      user: createUser(2)
    }
  ]
});

export const createCompany = (
  id = 1,
  name = "Example Company",
  user = createUser(1, "Example User"),
  jobs = createJobs()
) => ({
  id: id,
  name: name,
  location: "Nashville, TN",
  phone: "615-555-5555",
  size: 10,
  created_at: "2017-09-14T16:45:06.572Z",
  updated_at: "2017-09-14T16:45:06.572Z",
  description: "Example Description",
  user_id: user.id,
  user: user,
  ...jobs
});
