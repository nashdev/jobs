import "whatwg-fetch";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
import fetchMock from "fetch-mock";
const mockStore = configureMockStore(middlewares);
import {
  createCompany,
  createJobs,
  createUser
} from "client/companies/test-utils";

import * as actions from "client/companies/actions";
import * as types from "client/companies/types";

jest.mock("history/createBrowserHistory", () => {
  return () => ({
    listen: jest.fn(),
    push: jest.fn()
  });
});

describe("actions", () => {
  it("loadCompanies(): should create an action to load all companies", () => {
    const companies = {
      data: [createCompany()]
    };

    const expectedAction = {
      type: types.LOAD,
      payload: companies,
      append: false
    };
    expect(actions.loadCompanies(companies, false)).toEqual(expectedAction);
  });

  it("createCompany(): should create an action to create a new company", () => {
    const company = {
      data: createCompany()
    };

    const expectedAction = {
      type: types.CREATE,
      payload: company,
      messages: {
        success: [{ msg: "Successfully created your company." }]
      }
    };
    expect(actions.createCompany(company)).toEqual(expectedAction);
  });

  it("readCompany(): should create an action to read a specific company", () => {
    const company = {
      data: createCompany()
    };

    const expectedAction = {
      type: types.READ,
      payload: company
    };
    expect(actions.readCompany(company)).toEqual(expectedAction);
  });

  it("updateCompany(): should create an action to update a specific company", () => {
    const company = {
      data: createCompany()
    };

    const expectedAction = {
      type: types.UPDATE,
      payload: company,
      messages: {
        success: [{ msg: "Successfully updated your company." }]
      }
    };
    expect(actions.updateCompany(company)).toEqual(expectedAction);
  });

  it("deleteCompany(): should create an action to update a specific company", () => {
    const company = {
      data: createCompany()
    };

    const expectedAction = {
      type: types.DELETE,
      payload: company,
      messages: {
        success: [{ msg: "Successfully deleted your company." }]
      }
    };
    expect(actions.deleteCompany(company)).toEqual(expectedAction);
  });
});

describe("action creators", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("getCompany() - should fetch a company and normalize the response", async () => {
    fetchMock.get("/api/companies/1", {
      body: {
        data: createCompany(),
        errors: null
      }
    });

    const expectedActions = [
      {
        payload: {
          entities: {
            companies: {
              "1": {
                created_at: "2017-09-14T16:45:06.572Z",
                description: "Example Description",
                id: 1,
                jobs: [1, 2],
                location: "Nashville, TN",
                name: "Example Company",
                phone: "615-555-5555",
                size: 10,
                updated_at: "2017-09-14T16:45:06.572Z",
                user: 1,
                user_id: 1
              }
            },
            jobs: {
              "1": { id: 1, title: "Example Job", user: 1, user_id: 1 },
              "2": { id: 2, title: "Example Job 2", user: 2, user_id: 2 }
            },
            users: {
              "1": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 1,
                location: "Nashville, TN",
                name: "Example User",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              },
              "2": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 2,
                location: "Nashville, TN",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              }
            }
          },
          result: 1
        },
        type: types.READ
      }
    ];

    const store = mockStore({
      companies: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const company = await store.dispatch(actions.getCompany(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("getAllCompanies() - should fetch a paginated list of companies and normalize the response", async () => {
    const companies = [
      createCompany(
        1,
        "Example Company",
        createUser(1, "Example User"),
        createJobs()
      ),

      createCompany(
        2,
        "Example Company 2",
        createUser(1, "Example User"),
        createJobs()
      )
    ];

    fetchMock.get("/api/companies?page=1&pageSize=10", {
      body: {
        data: companies,
        errors: null
      }
    });

    const expectedActions = [
      {
        append: false,
        payload: {
          entities: {
            companies: {
              "1": {
                created_at: "2017-09-14T16:45:06.572Z",
                description: "Example Description",
                id: 1,
                jobs: [1, 2],
                location: "Nashville, TN",
                name: "Example Company",
                phone: "615-555-5555",
                size: 10,
                updated_at: "2017-09-14T16:45:06.572Z",
                user: 1,
                user_id: 1
              },
              "2": {
                created_at: "2017-09-14T16:45:06.572Z",
                description: "Example Description",
                id: 2,
                jobs: [1, 2],
                location: "Nashville, TN",
                name: "Example Company 2",
                phone: "615-555-5555",
                size: 10,
                updated_at: "2017-09-14T16:45:06.572Z",
                user: 1,
                user_id: 1
              }
            },
            jobs: {
              "1": { id: 1, title: "Example Job", user: 1, user_id: 1 },
              "2": { id: 2, title: "Example Job 2", user: 2, user_id: 2 }
            },
            users: {
              "1": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 1,
                location: "Nashville, TN",
                name: "Example User",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              },
              "2": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 2,
                location: "Nashville, TN",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              }
            }
          },
          result: [1, 2]
        },
        type: types.LOAD
      }
    ];

    const store = mockStore({
      companies: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const company = await store.dispatch(actions.getAllCompanies());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("editCompany() - should persist a company change and normalize the response", async () => {
    let company = createCompany(1, "Example Company Updated");

    fetchMock.post("/api/companies/1", {
      body: {
        data: company,
        errors: null
      }
    });

    const expectedActions = [
      {
        messages: { success: [{ msg: "Successfully updated your company." }] },
        payload: {
          entities: {
            companies: {
              "1": {
                created_at: "2017-09-14T16:45:06.572Z",
                description: "Example Description",
                id: 1,
                jobs: [1, 2],
                location: "Nashville, TN",
                name: "Example Company Updated",
                phone: "615-555-5555",
                size: 10,
                updated_at: "2017-09-14T16:45:06.572Z",
                user: 1,
                user_id: 1
              }
            },
            jobs: {
              "1": { id: 1, title: "Example Job", user: 1, user_id: 1 },
              "2": { id: 2, title: "Example Job 2", user: 2, user_id: 2 }
            },
            users: {
              "1": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 1,
                location: "Nashville, TN",
                name: "Example User",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              },
              "2": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 2,
                location: "Nashville, TN",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              }
            }
          },
          result: 1
        },
        type: types.UPDATE
      }
    ];

    const store = mockStore({
      companies: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    await store.dispatch(
      actions.editCompany({
        id: 1,
        title: "Example Company Updated"
      })
    );
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("removeCompany() - should persist a company removal", async () => {
    fetchMock.delete("/api/companies/1", {
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
          company: {
            id: 1
          }
        },
        messages: {
          success: [{ msg: "Successfully deleted your company." }]
        }
      }
    ];

    const store = mockStore({
      companies: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const company = await store.dispatch(actions.removeCompany(1));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it("addCompany() - should persist a company and normalize the response", async () => {
    fetchMock.post("/api/companies", {
      body: {
        data: createCompany(),
        errors: null
      }
    });

    const expectedActions = [
      {
        messages: { success: [{ msg: "Successfully created your company." }] },
        payload: {
          entities: {
            companies: {
              "1": {
                created_at: "2017-09-14T16:45:06.572Z",
                description: "Example Description",
                id: 1,
                jobs: [1, 2],
                location: "Nashville, TN",
                name: "Example Company",
                phone: "615-555-5555",
                size: 10,
                updated_at: "2017-09-14T16:45:06.572Z",
                user: 1,
                user_id: 1
              }
            },
            jobs: {
              "1": { id: 1, title: "Example Job", user: 1, user_id: 1 },
              "2": { id: 2, title: "Example Job 2", user: 2, user_id: 2 }
            },
            users: {
              "1": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 1,
                location: "Nashville, TN",
                name: "Example User",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              },
              "2": {
                created_at: "2017-09-14T16:19:07.018Z",
                email: "user@example.com",
                facebook: null,
                github: null,
                google: null,
                gravatar: "https://gravatar.com/avatar/md5hash?s=200&d=retro",
                id: 2,
                location: "Nashville, TN",
                picture: null,
                twitter: null,
                updated_at: "2017-09-14T18:17:57.596Z",
                vk: null,
                website: "http://jobs.nashdev.com/"
              }
            }
          },
          result: 1
        },
        type: types.CREATE
      }
    ];

    const store = mockStore({
      companies: {
        byId: {},
        ids: [],
        pagination: {}
      }
    });

    const company = await store.dispatch(
      actions.addCompany({
        title: "Example Company",
        company_id: 1
      })
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});
