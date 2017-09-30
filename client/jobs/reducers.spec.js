import normalize from "jsonapi-normalizer";
import reducer from "client/jobs/reducers";
import * as actions from "client/jobs/actions";
import * as types from "client/jobs/types";
import { getCollection, getJob, createJob } from "client/jobs/test-utils";

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      ids: []
    });
  });

  it(`should handle ${types.LOAD} with default state`, () => {
    const response = getJob();

    const jobs = actions.loadJobs(normalize(response));
    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.LOAD} with existing state`, () => {
    const state = {
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = getCollection();

    const jobs = actions.loadJobs(normalize(response));
    expect(reducer(state, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        },
        "2": {
          company: { id: "1", type: "companies" },
          company_id: 1,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 2,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        },
        "3": {
          company: { id: "1", type: "companies" },
          company_id: 1,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 3,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [2, 2, 3]
    });
  });

  it(`should handle ${types.CREATE} with default state`, () => {
    const response = normalize(createJob());
    const jobs = actions.createJob(response);

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "27", type: "companies" },
          company_id: 27,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.CREATE} with existing state`, () => {
    const state = {
      byId: {
        "1": {
          company: { id: "27", type: "companies" },
          company_id: 27,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = normalize(createJob(1, "Example Job 3"));
    const jobs = actions.createJob(response);

    expect(reducer(state, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "27", type: "companies" },
          company_id: 27,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1, 1]
    });
  });

  it(`should handle ${types.READ} with default state`, () => {
    const response = normalize(getJob());
    const jobs = actions.readJob(response);

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.READ} with existing state`, () => {
    const state = {
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = normalize(getJob(2, "Example Company 2"));
    const jobs = actions.readJob(response);

    expect(reducer(state, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        },
        "2": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 2,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Company 2",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1, 2]
    });
  });

  it(`should handle ${types.UPDATE} with default state`, () => {
    const response = normalize(getJob());
    const jobs = actions.updateJob(response);

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: []
    });
  });

  it(`should handle ${types.UPDATE} with existing state`, () => {
    const state = {
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = normalize(getJob(1, "Example Job - Updated"));
    const jobs = actions.updateJob(response);

    expect(reducer(state, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job - Updated",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.DELETE} with default state`, () => {
    const response = normalize(getJob());
    const jobs = actions.deleteJob(response);

    // INFO: Currently only the id reducer handles delete,
    // the original entity still lives in byId. This isn't
    // entirely desireable.
    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: []
    });
  });

  it(`should handle ${types.DELETE} with existing state`, () => {
    const state = {
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job - Updated",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = normalize(getJob());
    const jobs = actions.deleteJob(response);
    // INFO: Currently only the id reducer handles delete,
    // the original entity still lives in byId. This isn't
    // entirely desireable.
    expect(reducer(state, jobs)).toEqual({
      byId: {
        "1": {
          company: { id: "2", type: "companies" },
          company_id: 2,
          contact_email: "user1@example.com",
          contact_person: "Example User",
          contact_phone: "615-555-5555",
          contact_slack: "slack_user",
          contact_website: "http://example.com",
          created_at: "2017-09-30T18:22:16.694Z",
          description: "Job Details",
          experience_range: 100,
          id: 1,
          location: "Nashville, TN",
          recruiter: false,
          recruiter_agency: null,
          remote_available: false,
          salary_range: 30,
          status: "open",
          title: "Example Job",
          type: "fulltime",
          updated_at: "2017-09-30T18:22:16.694Z",
          user: { id: "1", type: "users" },
          user_id: 1
        }
      },
      ids: []
    });
  });
});
