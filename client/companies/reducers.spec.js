import { normalize } from "normalizr";
import reducer from "client/companies/reducers";
import * as actions from "client/companies/actions";
import * as types from "client/companies/types";
import { companyListSchema, companySchema } from "client/schema";
import {
  createCompany,
  createJobs,
  createUser
} from "client/companies/test-utils";

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      ids: []
    });
  });

  it(`should handle ${types.LOAD} with default state`, () => {
    const response = [createCompany()];
    const companies = actions.loadCompanies(
      normalize(response, companyListSchema)
    );
    expect(reducer(undefined, companies)).toEqual({
      byId: {
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
      ids: [1]
    });
  });

  it(`should handle ${types.LOAD} with existing state`, () => {
    const state = {
      byId: {
        1: {
          id: 1,
          name: "Example Company",
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
      ids: [1]
    };

    const response = [createCompany(2, "Example Company 2")];

    const companies = actions.loadCompanies(
      normalize(response, companyListSchema)
    );
    expect(reducer(state, companies)).toEqual({
      byId: {
        1: {
          id: 1,
          name: "Example Company",
          location: "Nashville, TN",
          phone: "615-555-5555",
          size: 10,
          created_at: "2017-09-14T16:45:06.572Z",
          updated_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          user_id: 1,
          user: 1,
          jobs: [3, 4]
        },
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
          jobs: [1, 2]
        }
      },
      ids: [2]
    });
  });

  it(`should handle ${types.CREATE} with default state`, () => {
    const response = createCompany();

    const companies = actions.createCompany(normalize(response, companySchema));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
        1: {
          id: 1,
          name: "Example Company",
          location: "Nashville, TN",
          phone: "615-555-5555",
          size: 10,
          created_at: "2017-09-14T16:45:06.572Z",
          updated_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          user_id: 1,
          user: 1,
          jobs: [1, 2]
        }
      },
      ids: [1]
    });
  });

  it(`should handle ${types.CREATE} with existing state`, () => {
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

    const response = createCompany(3, "Example Company 3");

    const companies = actions.createCompany(normalize(response, companySchema));
    expect(reducer(state, companies)).toEqual({
      byId: {
        "2": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 2,
          jobs: [3, 4],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        },
        "3": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 3,
          jobs: [1, 2],
          location: "Nashville, TN",
          name: "Example Company 3",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        }
      },
      ids: [2, 3]
    });
  });

  it(`should handle ${types.READ} with default state`, () => {
    const response = createCompany();

    const companies = actions.readCompany(normalize(response, companySchema));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
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
      ids: [1]
    });
  });

  it(`should handle ${types.READ} with existing state`, () => {
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

    const response = createCompany(3, "Example Company 3");

    const companies = actions.readCompany(normalize(response, companySchema));
    expect(reducer(state, companies)).toEqual({
      byId: {
        "2": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 2,
          jobs: [3, 4],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        },
        "3": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 3,
          jobs: [1, 2],
          location: "Nashville, TN",
          name: "Example Company 3",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        }
      },
      ids: [2, 3]
    });
  });

  it(`should handle ${types.UPDATE} with default state`, () => {
    const response = createCompany();
    const companies = actions.updateCompany(normalize(response, companySchema));

    expect(reducer(undefined, companies)).toEqual({
      byId: {
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
      ids: []
    });
  });

  it(`should handle ${types.UPDATE} with existing state`, () => {
    const state = {
      byId: {
        "2": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 2,
          jobs: [3, 4],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        },
        "3": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 3,
          jobs: [1, 2],
          location: "Nashville, TN",
          name: "Example Company 3",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        }
      },
      ids: [2, 3]
    };

    const response = createCompany(3, "Example Company 3 - Updated");

    const companies = actions.updateCompany(normalize(response, companySchema));
    expect(reducer(state, companies)).toEqual({
      byId: {
        "2": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 2,
          jobs: [3, 4],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        },
        "3": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 3,
          jobs: [1, 2],
          location: "Nashville, TN",
          name: "Example Company 3 - Updated",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        }
      },
      ids: [2, 3]
    });
  });

  it(`should handle ${types.DELETE} with default state`, () => {
    const response = createCompany();

    //INFO: Delete response is not normalized
    //TODO: Handle delete in byId reducer
    const companies = actions.deleteCompany(response);

    expect(reducer(undefined, companies)).toEqual({
      byId: {},
      ids: []
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

    const response = {
      company: createCompany(2, "Example Company 2")
    };

    const companies = actions.deleteCompany(response);
    // INFO: Currently only the id reducer handles delete,
    // the original entity still lives in byId. This isn't
    // entirely desireable.
    expect(reducer(state, companies)).toEqual({
      byId: {
        "2": {
          created_at: "2017-09-14T16:45:06.572Z",
          description: "Example Description",
          id: 2,
          jobs: [3, 4],
          location: "Nashville, TN",
          name: "Example Company 2",
          phone: "615-555-5555",
          size: 10,
          updated_at: "2017-09-14T16:45:06.572Z",
          user: 1,
          user_id: 1
        }
      },
      ids: []
    });
  });
});
