import normalize from "jsonapi-normalizer";
import reducer from "client/companies/reducers";
import * as actions from "client/companies/actions";
import * as types from "client/companies/types";

import {
  getCollection,
  getCompany,
  createCompany
} from "client/companies/test-utils";

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      ids: []
    });
  });

  it(`should handle ${types.LOAD} with default state`, () => {
    const response = getCollection();
    const companies = actions.loadCompanies(normalize(response));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        1: {
          created_at: "2017-09-02T17:17:37.446Z",
          description: "Example Company Description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-02T17:17:37.446Z",
          user: { id: 1, type: "users" },
          user_id: 1
        },
        2: {
          created_at: "2017-08-30T22:13:08.358Z",
          description: "Example Company Description",
          id: 2,
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5559",
          size: 75,
          updated_at: "2017-08-30T22:13:08.358Z",
          user: { id: 2, type: "users" },
          user_id: 2
        },
        3: {
          created_at: "2017-08-18T19:30:50.611Z",
          description: "Example Company 3",
          id: 3,
          location: "Nashville TN",
          name: "Example Company 3",
          phone: "615-555-5552",
          size: 100,
          updated_at: "2017-08-18T19:30:50.611Z",
          user: { id: 3, type: "users" },
          user_id: 3
        }
      },
      ids: [1, 2, 3]
    });
  });

  it(`should handle ${types.LOAD} with existing state`, () => {
    const state = {
      byId: {
        1: {
          created_at: "2017-09-02T17:17:37.446Z",
          description: "Example Company Description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-02T17:17:37.446Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = getCollection();

    const companies = actions.loadCompanies(normalize(response));
    expect(reducer(state, companies)).toEqual({
      byId: {
        1: {
          created_at: "2017-09-02T17:17:37.446Z",
          description: "Example Company Description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-02T17:17:37.446Z",
          user: { id: 1, type: "users" },
          user_id: 1
        },
        2: {
          created_at: "2017-08-30T22:13:08.358Z",
          description: "Example Company Description",
          id: 2,
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5559",
          size: 75,
          updated_at: "2017-08-30T22:13:08.358Z",
          user: { id: 2, type: "users" },
          user_id: 2
        },
        3: {
          created_at: "2017-08-18T19:30:50.611Z",
          description: "Example Company 3",
          id: 3,
          location: "Nashville TN",
          name: "Example Company 3",
          phone: "615-555-5552",
          size: 100,
          updated_at: "2017-08-18T19:30:50.611Z",
          user: { id: 3, type: "users" },
          user_id: 3
        }
      },
      ids: [1, 2, 3]
    });
  });

  it(`should handle ${types.CREATE} with default state`, () => {
    const response = createCompany();

    const companies = actions.createCompany(normalize(response));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        1: {
          created_at: "2017-09-30T17:00:48.469Z",
          description: "Example company description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: "200",
          updated_at: "2017-09-30T17:00:48.469Z",
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.CREATE} with existing state`, () => {
    const state = {
      byId: {
        1: {
          created_at: "2017-09-02T17:17:37.446Z",
          description: "Example Company Description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-02T17:17:37.446Z",
          user: { id: 1, type: "users" },
          user_id: 1
        },
        2: {
          created_at: "2017-08-30T22:13:08.358Z",
          description: "Example Company Description",
          id: 2,
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5559",
          size: 75,
          updated_at: "2017-08-30T22:13:08.358Z",
          user: { id: 2, type: "users" },
          user_id: 2
        },
        3: {
          created_at: "2017-08-18T19:30:50.611Z",
          description: "Example Company 3",
          id: 3,
          location: "Nashville TN",
          name: "Example Company 3",
          phone: "615-555-5552",
          size: 100,
          updated_at: "2017-08-18T19:30:50.611Z",
          user: { id: 3, type: "users" },
          user_id: 3
        }
      },
      ids: [1, 2, 3]
    };

    const response = createCompany(4, "Example Company 4");

    const companies = actions.createCompany(normalize(response));
    expect(reducer(state, companies)).toEqual({
      byId: {
        1: {
          created_at: "2017-09-02T17:17:37.446Z",
          description: "Example Company Description",
          id: 1,
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-02T17:17:37.446Z",
          user: { id: 1, type: "users" },
          user_id: 1
        },
        2: {
          created_at: "2017-08-30T22:13:08.358Z",
          description: "Example Company Description",
          id: 2,
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5559",
          size: 75,
          updated_at: "2017-08-30T22:13:08.358Z",
          user: { id: 2, type: "users" },
          user_id: 2
        },
        3: {
          created_at: "2017-08-18T19:30:50.611Z",
          description: "Example Company 3",
          id: 3,
          location: "Nashville TN",
          name: "Example Company 3",
          phone: "615-555-5552",
          size: 100,
          updated_at: "2017-08-18T19:30:50.611Z",
          user: { id: 3, type: "users" },
          user_id: 3
        },
        4: {
          created_at: "2017-09-30T17:00:48.469Z",
          description: "Example company description",
          id: 4,
          location: "Nashville, TN",
          name: "Example Company 4",
          phone: "615-555-5555",
          size: "200",
          updated_at: "2017-09-30T17:00:48.469Z",
          user_id: 1
        }
      },
      ids: [1, 2, 3, 4]
    });
  });

  it(`should handle ${types.READ} with default state`, () => {
    const response = getCompany();
    const companies = actions.readCompany(normalize(response));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        "1": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 1,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.READ} with existing state`, () => {
    const state = {
      byId: {
        "5": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 5,
          jobs: [
            { id: 5, type: "jobs" },
            { id: 6, type: "jobs" },
            { id: 7, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [5]
    };

    const response = getCompany(3, "Example Company 3");
    const companies = actions.readCompany(normalize(response));
    expect(reducer(state, companies)).toEqual({
      byId: {
        "3": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 3,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company 3",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        },
        "5": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 5,
          jobs: [
            { id: 5, type: "jobs" },
            { id: 6, type: "jobs" },
            { id: 7, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [5, 3]
    });
  });

  it(`should handle ${types.UPDATE} with default state`, () => {
    const response = getCompany();
    const companies = actions.updateCompany(normalize(response));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        "1": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 1,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
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
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 1,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company 1",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    };

    const response = getCompany(1, "Example Company 1 - Updated");

    const companies = actions.updateCompany(normalize(response));
    expect(reducer(state, companies)).toEqual({
      byId: {
        "1": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 1,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company 1 - Updated",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.DELETE} with default state`, () => {
    const response = getCompany();
    const companies = actions.deleteCompany(normalize(response));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        "1": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 1,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: [] // only the ids reducer gets modified, the original entity still exists. This probably needs to change.
    });
  });

  it(`should handle ${types.DELETE} with existing state`, () => {
    const state = {
      byId: {
        2: {
          id: 2,
          name: "Example Company 2",
          location: "Nashville, TN",
          phone: "615-555-5555",
          size: 10,
          created_at: "2017-09-14T16:45:06.572Z",
          updated_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          user_id: 1,
          user: 1,
          jobs: [3, 4]
        }
      },
      ids: [2]
    };

    const response = getCompany(2, "Example Company 2");
    const companies = actions.deleteCompany(normalize(response));
    // INFO: Currently only the id reducer handles delete,
    // the original entity still lives in byId. This isn't
    // entirely desireable.
    expect(reducer(state, companies)).toEqual({
      byId: {
        "2": {
          created_at: "2017-08-02T00:38:54.962Z",
          description: "Example Description",
          id: 2,
          jobs: [
            { id: 2, type: "jobs" },
            { id: 3, type: "jobs" },
            { id: 1, type: "jobs" }
          ],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 200,
          updated_at: "2017-09-30T04:41:49.441Z",
          user: { id: 1, type: "users" },
          user_id: 1
        }
      },
      ids: []
    });
  });
});
