import "whatwg-fetch";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
import fetchMock from "fetch-mock";
const mockStore = configureMockStore(middlewares);

import * as actions from "client/jobs/actions";
import * as types from "client/jobs/types";

jest.mock("history/createBrowserHistory", () => {
  return () => ({
    listen: jest.fn(),
    push: jest.fn()
  });
});

describe("actions", () => {
  it("loadJobs(): should create an action to load all jobs", () => {
    const jobs = {
      data: []
    };

    const expectedAction = {
      type: types.LOAD,
      payload: jobs,
      pagination: false
    };
    expect(actions.loadJobs(jobs, false)).toEqual(expectedAction);
  });

  it("createJob(): should create an action to create a new job", () => {
    const job = {
      data: {}
    };

    const expectedAction = {
      type: types.CREATE,
      payload: job,
      messages: {
        success: [{ msg: "Successfully created your job." }]
      }
    };
    expect(actions.createJob(job)).toEqual(expectedAction);
  });

  it("readJob(): should create an action to read a specific job", () => {
    const job = {
      data: {}
    };

    const expectedAction = {
      type: types.READ,
      payload: job
    };
    expect(actions.readJob(job)).toEqual(expectedAction);
  });

  it("updateJob(): should create an action to update a specific job", () => {
    const job = {
      data: {}
    };

    const expectedAction = {
      type: types.UPDATE,
      payload: job,
      messages: {
        success: [{ msg: "Successfully updated your job." }]
      }
    };
    expect(actions.updateJob(job)).toEqual(expectedAction);
  });

  it("deleteJob(): should create an action to update a specific job", () => {
    const job = {
      data: {}
    };

    const expectedAction = {
      type: types.DELETE,
      payload: job,
      messages: {
        success: [{ msg: "Successfully deleted your job." }]
      }
    };
    expect(actions.deleteJob(job)).toEqual(expectedAction);
  });
});

describe("action creators", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("getJob() - should fetch a job and normalize the response", async () => {
    fetchMock.get("/api/jobs/1", {
      body: {
        data: {
          id: 1,
          title: "Example Job",
          user_id: 1,
          user: {
            id: 1,
            name: "Example User"
          },
          company_id: 1,
          company: {
            id: 1,
            name: "Example company"
          }
        },
        errors: null
      }
    });

    const expectedActions = [
      {
        type: types.READ,
        payload: {
          entities: {
            users: { "1": { id: 1, name: "Example User" } },
            companies: { "1": { id: 1, name: "Example company" } },
            jobs: {
              "1": {
                id: 1,
                title: "Example Job",
                user_id: 1,
                user: 1,
                company_id: 1,
                company: 1
              }
            }
          },
          result: 1
        }
      }
    ];

    const store = mockStore({
      jobs: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const job = await store.dispatch(actions.getJob(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("getAllJobs() - should fetch a paginated list of jobs and normalize the response", async () => {
    fetchMock.get("/api/jobs?page=1&pageSize=9", {
      body: {
        data: [
          {
            id: 1,
            title: "Example Job",
            user_id: 1,
            user: {
              id: 1,
              name: "Example User"
            },
            company_id: 1,
            company: {
              id: 1,
              name: "Example company"
            }
          },
          {
            id: 2,
            title: "Example Job 2",
            user_id: 1,
            user: {
              id: 1,
              name: "Example User"
            },
            company_id: 1,
            company: {
              id: 1,
              name: "Example company"
            }
          }
        ],
        errors: null
      }
    });

    const expectedActions = [
      {
        type: types.LOAD,
        payload: {
          entities: {
            users: { "1": { id: 1, name: "Example User" } },
            companies: { "1": { id: 1, name: "Example company" } },
            jobs: {
              "1": {
                id: 1,
                title: "Example Job",
                user_id: 1,
                user: 1,
                company_id: 1,
                company: 1
              },
              "2": {
                id: 2,
                title: "Example Job 2",
                user_id: 1,
                user: 1,
                company_id: 1,
                company: 1
              }
            }
          },
          result: [1, 2]
        }
      }
    ];

    const store = mockStore({
      jobs: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const job = await store.dispatch(actions.getAllJobs());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("editJob() - should persist a job change and normalize the response", async () => {
    fetchMock.post("/api/jobs/1", {
      body: {
        data: {
          id: 1,
          title: "Example Job Updated",
          user_id: 1,
          user: {
            id: 1,
            name: "Example User"
          },
          company_id: 1,
          company: {
            id: 1,
            name: "Example company"
          }
        },
        errors: null
      }
    });

    const expectedActions = [
      {
        type: types.UPDATE,
        payload: {
          entities: {
            users: { "1": { id: 1, name: "Example User" } },
            companies: { "1": { id: 1, name: "Example company" } },
            jobs: {
              "1": {
                id: 1,
                title: "Example Job Updated",
                user_id: 1,
                user: 1,
                company_id: 1,
                company: 1
              }
            }
          },
          result: 1
        },
        messages: {
          success: [{ msg: "Successfully updated your job." }]
        }
      }
    ];

    const store = mockStore({
      jobs: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const job = await store.dispatch(
      actions.editJob({
        id: 1,
        title: "Example Job Updated"
      })
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("removeJob() - should persist a job removal", async () => {
    fetchMock.delete("/api/jobs/1", {
      body: {
        data: {
          id: 1
        },
        errors: null
      }
    });

    const expectedActions = [
      {
        type: types.DELETE,
        payload: {
          job: {
            id: 1
          }
        },
        messages: {
          success: [{ msg: "Successfully deleted your job." }]
        }
      }
    ];

    const store = mockStore({
      jobs: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const job = await store.dispatch(actions.removeJob(1));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("addJob() - should persist a job and normalize the response", async () => {
    fetchMock.post("/api/jobs", {
      body: {
        data: {
          id: 1,
          company_id: 1,
          user_id: 1,
          title: "Example Job",
          user: {
            id: 1,
            name: "Example User"
          },
          company: {
            id: 1,
            name: "Example Company"
          }
        },
        errors: null
      }
    });

    const expectedActions = [
      {
        type: types.CREATE,
        payload: {
          entities: {
            users: { "1": { id: 1, name: "Example User" } },
            companies: { "1": { id: 1, name: "Example Company" } },
            jobs: {
              "1": {
                id: 1,
                title: "Example Job",
                user_id: 1,
                user: 1,
                company_id: 1,
                company: 1
              }
            }
          },
          result: 1
        },
        messages: {
          success: [{ msg: "Successfully created your job." }]
        }
      }
    ];

    const store = mockStore({
      jobs: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const job = await store.dispatch(
      actions.addJob({
        title: "Example Job",
        company_id: 1
      })
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});
