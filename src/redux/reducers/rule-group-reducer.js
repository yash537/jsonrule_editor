import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  ruleGroups: [],
  error: null
};

const RuleGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RULE_GROUPS_SUCCESS:
      return {
        ...state,
        ruleGroups: action.payload,
        error: null
      };
    case ActionTypes.FETCH_RULE_GROUPS_FAILURE:
      return {
        ...state,
        ruleGroups: [],
        error: action.payload
      };
    case ActionTypes.CREATE_RULE_GROUP:
      return {
        ...state,
        ruleGroups: state.ruleGroups.concat(action.payload)
      };
    default:
      return state;
  }
};

export default RuleGroupReducer;
