import "whatwg-fetch";
import normalize from "jsonapi-normalizer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
import fetchMock from "fetch-mock";
const mockStore = configureMockStore(middlewares);
import {
  getCollection,
  getCompany,
  createCompany
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
    const companies = normalize(getCollection());

    const expectedAction = {
      type: types.LOAD,
      payload: companies,
      append: false
    };
    expect(actions.loadCompanies(companies, false)).toEqual(expectedAction);
  });

  it("createCompany(): should create an action to create a new company", () => {
    const company = normalize(createCompany());

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
    const company = normalize(getCompany());

    const expectedAction = {
      type: types.READ,
      payload: company
    };
    expect(actions.readCompany(company)).toEqual(expectedAction);
  });

  it("updateCompany(): should create an action to update a specific company", () => {
    const company = normalize(getCompany());

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
    const company = normalize(getCompany());

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
      body: getCompany()
    });

    const expectedActions = [
      {
        payload: normalize(getCompany()),
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
    fetchMock.get("/api/companies?page=1&pageSize=10", {
      body: getCollection()
    });

    const expectedActions = [
      {
        append: false,
        payload: normalize(getCollection()),
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
      body: company
    });

    const expectedActions = [
      {
        messages: {
          success: [{ msg: "Successfully updated your company." }]
        },
        payload: normalize(company),
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
      body: getCompany()
    });

    const expectedActions = [
      {
        type: types.DELETE,
        payload: normalize(getCompany()),
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
      body: createCompany()
    });

    const expectedActions = [
      {
        messages: {
          success: [{ msg: "Successfully created your company." }]
        },
        payload: normalize(createCompany()),
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
