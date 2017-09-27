import { normalize } from "normalizr";
import reducer from "client/jobs/reducers";
import * as actions from "client/jobs/actions";
import * as types from "client/jobs/types";
import { jobListSchema, jobSchema } from "client/schema";

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      ids: [],
      pagination: {}
    });
  });

  it(`should handle ${types.LOAD} with default state`, () => {
    const response = [
      {
        id: 1,
        title: "Example Job",
        company_id: 1,
        user_id: 1,
        company: {
          id: 1,
          name: "Example Company"
        },
        user: {
          id: 1,
          name: "Example User"
        }
      }
    ];
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const jobs = actions.loadJobs(
      normalize(response, jobListSchema),
      pagination
    );
    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        1: {
          id: 1,
          title: "Example Job",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [1],
      pagination: pagination
    });
  });

  it(`should handle ${types.LOAD} with existing state`, () => {
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const state = {
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2],
      pagination: pagination
    };

    const response = [
      {
        id: 1,
        title: "Example Job",
        company_id: 1,
        user_id: 1,
        company: {
          id: 1,
          name: "Example Company"
        },
        user: {
          id: 1,
          name: "Example User"
        }
      }
    ];

    const jobs = actions.loadJobs(
      normalize(response, jobListSchema),
      pagination
    );
    expect(reducer(state, jobs)).toEqual({
      byId: {
        1: {
          id: 1,
          title: "Example Job",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [1], // LOAD replaces all ids
      pagination: pagination
    });
  });

  it(`should handle ${types.CREATE} with default state`, () => {
    const response = {
      id: 1,
      title: "Example Job",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.createJob(normalize(response, jobSchema));

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        1: {
          id: 1,
          title: "Example Job",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [1],
      pagination: {}
    });
  });

  it(`should handle ${types.CREATE} with existing state`, () => {
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const state = {
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2],
      pagination: pagination
    };

    const response = {
      id: 3,
      title: "Example Job 3",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.createJob(normalize(response, jobSchema));
    expect(reducer(state, jobs)).toEqual({
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2, 3],
      pagination: pagination
    });
  });

  it(`should handle ${types.READ} with default state`, () => {
    const response = {
      id: 1,
      title: "Example Job",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.readJob(normalize(response, jobSchema));

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        1: {
          id: 1,
          title: "Example Job",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [1],
      pagination: {}
    });
  });

  it(`should handle ${types.READ} with existing state`, () => {
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const state = {
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2],
      pagination: pagination
    };

    const response = {
      id: 3,
      title: "Example Job 3",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.readJob(normalize(response, jobSchema));
    expect(reducer(state, jobs)).toEqual({
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2, 3],
      pagination: pagination
    });
  });

  it(`should handle ${types.UPDATE} with default state`, () => {
    const response = {
      id: 1,
      title: "Example Job",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.updateJob(normalize(response, jobSchema));

    expect(reducer(undefined, jobs)).toEqual({
      byId: {
        1: {
          id: 1,
          title: "Example Job",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [],
      pagination: {}
    });
  });

  it(`should handle ${types.UPDATE} with existing state`, () => {
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const state = {
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2, 3],
      pagination: pagination
    };

    const response = {
      id: 3,
      title: "Example Job 3 - Updated",
      company_id: 1,
      user_id: 1,
      company: {
        id: 1,
        name: "Example Company"
      },
      user: {
        id: 1,
        name: "Example User"
      }
    };

    const jobs = actions.updateJob(normalize(response, jobSchema));
    expect(reducer(state, jobs)).toEqual({
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3 - Updated",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2, 3],
      pagination: pagination
    });
  });

  it(`should handle ${types.DELETE} with default state`, () => {
    const response = {
      id: 1
    };

    //INFO: Delete response is not normalized
    //TODO: Handle delete in byId reducer
    const jobs = actions.deleteJob(response);

    expect(reducer(undefined, jobs)).toEqual({
      byId: {},
      ids: [],
      pagination: {}
    });
  });

  it(`should handle ${types.DELETE} with existing state`, () => {
    const pagination = {
      page: 1,
      pageSize: 9,
      rowCount: 1,
      pageCount: 1
    };
    const state = {
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2, 3],
      pagination: pagination
    };

    const response = {
      job: {
        id: 3
      }
    };

    const jobs = actions.deleteJob(response);
    // INFO: Currently only the id reducer handles delete,
    // the original entity still lives in byId. This isn't
    // entirely desireable.
    expect(reducer(state, jobs)).toEqual({
      byId: {
        2: {
          id: 2,
          title: "Example Job 2",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        },
        3: {
          id: 3,
          title: "Example Job 3",
          company_id: 1,
          company: 1,
          user_id: 1,
          user: 1
        }
      },
      ids: [2],
      pagination: pagination
    });
  });
});
