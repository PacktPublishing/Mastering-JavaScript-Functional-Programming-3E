/* eslint-disable @typescript-eslint/no-unused-vars */

type AnyObject = Record<string, unknown>;

type ActionType = "CREATE" | "DELETE" | "UPDATE";

type Action = {
  type: ActionType;
  payload: AnyObject | null;
};

type State = Record<string, unknown>;

const initialState: State = {
  /*
    whatever is the initial state
*/
};

function doAction(state: State, action: Action) {
  const newState: State = {};
  switch (action?.type) {
    case "CREATE":
      // update state, generating newState,
      // depending on the action data
      // to create a new item
      return newState;

    case "DELETE":
      // update state, generating newState,
      // after deleting an item
      return newState;

    case "UPDATE":
      // update an item,
      // and generate an updated state
      return newState;

    default:
      return state;
  }
}

const dispatchTable: Record<
  ActionType,
  (state: State, action: Action) => State
> = {
  CREATE: (state, action) => {
    // update state, generating newState,
    // depending on the action data
    // to create a new item
    const NewState: State = {
      /* updated State */
    };
    return NewState;
  },

  DELETE: (state, action) => {
    // update state, generating newState,
    // after deleting an item
    const NewState: State = {
      /* updated State */
    };
    return NewState;
  },

  UPDATE: (state, action) => {
    // update an item,
    // and generate an updated state
    const NewState: State = {
      /* updated State */
    };
    return NewState;
  },
};

function doAction2(state: State, action: Action) {
  return dispatchTable[action.type]
    ? dispatchTable[action.type](state, action)
    : state;
}

const a = console.log;
