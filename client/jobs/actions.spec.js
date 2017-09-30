import "whatwg-fetch";
import configureMockStore from "redux-mock-store";
import normalize from "jsonapi-normalizer";
import thunk from "redux-thunk";
const middlewares = [thunk];
import fetchMock from "fetch-mock";
const mockStore = configureMockStore(middlewares);
import { getCollection, getJob, createJob } from "client/jobs/test-utils";

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
    const jobs = normalize(getCollection());

    const expectedAction = {
      type: types.LOAD,
      payload: jobs
    };
    expect(actions.loadJobs(jobs, false)).toEqual(expectedAction);
  });

  it("createJob(): should create an action to create a new job", () => {
    const job = normalize(createJob());

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
    const job = normalize(getJob());

    const expectedAction = {
      type: types.READ,
      payload: job
    };
    expect(actions.readJob(job)).toEqual(expectedAction);
  });

  it("updateJob(): should create an action to update a specific job", () => {
    const job = normalize(getJob());

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
    const job = normalize(getJob());

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
      body: getJob()
    });

    const expectedActions = [
      {
        type: types.READ,
        payload: normalize(getJob())
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
      body: getCollection()
    });

    const expectedActions = [
      {
        type: types.LOAD,
        payload: normalize(getCollection())
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
      body: getJob()
    });

    const expectedActions = [
      {
        type: types.UPDATE,
        payload: normalize(getJob()),
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
      body: getJob()
    });

    const expectedActions = [
      {
        type: types.DELETE,
        payload: normalize(getJob()),
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
      body: createJob()
    });

    const expectedActions = [
      {
        type: types.CREATE,
        payload: normalize(createJob()),
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
