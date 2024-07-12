import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  rules: [],
  error: null
};

const RulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RULE_SUCCESS:
      return {
        ...state,
        rules: action.payload,
        error: null
      };
    case ActionTypes.RESET_RULES:
      return {
        ...state,
        rules: action.payload,
        error: null
      };
    case ActionTypes.FETCH_RULE_FAILURE:
      return {
        ...state,
        rules: [],
        error: action.payload
      };
    case ActionTypes.CREATE_RULE:
      return {
        ...state,
        rules: state.rules.concat(action.payload)
      };
    case ActionTypes.DELETE_RULE: {
      const updatedRuleGroup = action.payload;
      return {
        ...state,
        rules: state.rules.filter(
          (ruleGroup) => ruleGroup.name != updatedRuleGroup
        )
      };
    }
    default:
      return state;
  }
};

export default RulesReducer;
