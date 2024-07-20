import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  tree: {}
};

function ruleset(state = initialState, action = "") {
  switch (action.type) {
    case ActionTypes.FETCH_DECISION_TREE_PER_RULE: {
      return {
        ...state,
        tree: action.payload
      };
    }

    case ActionTypes.SAVE_DECISION_TREE_PER_RULE: {
      return {
        ...state,
        tree: action.payload
      };
    }

    default:
      return state;
  }
}

export default ruleset;
