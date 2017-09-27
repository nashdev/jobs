import reducer from "client/messages/reducers";
// import * as actions from "client/messages/actions";
import * as types from "client/messages/types";

describe("reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it(`should handle ${types.CLEAR_MESSAGES} with default state`, () => {
    expect(
      reducer(undefined, {
        type: types.CLEAR_MESSAGES
      })
    ).toEqual({});
  });

  it(`should handle ${types.CLEAR_MESSAGES} with existing state`, () => {
    const state = {
      errors: [
        {
          msg: "Error message"
        }
      ]
    };
    expect(
      reducer(state, {
        type: types.CLEAR_MESSAGES
      })
    ).toEqual({});
  });

  it(`should handle any action with a message key present with default state`, () => {
    expect(
      reducer(undefined, {
        type: "EXAMPLE_ACTION",
        messages: {
          success: [{ msg: "Example action completed successfull." }]
        }
      })
    ).toEqual({
      success: [{ msg: "Example action completed successfull." }]
    });
  });

  it(`should handle any action with a message key present with existing state`, () => {
    const state = {
      errors: [
        {
          msg: "Error message"
        }
      ]
    };
    expect(
      reducer(state, {
        type: "EXAMPLE_ACTION",
        messages: {
          success: [{ msg: "Example action completed successfully." }]
        }
      })
    ).toEqual({
      errors: [{ msg: "Error message" }],
      success: [{ msg: "Example action completed successfully." }]
    });
  });
});
