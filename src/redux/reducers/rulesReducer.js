import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  rules: [],
  error: null,
  outputForRule: []
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
        rules: [],
        error: null,
        outputForRule: []
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
    case ActionTypes.UPDATE_RULE:
      const updatedRuleGroup = action.payload;
      return {
        ...state,
        rules: state.rules.map((ruleGroup) =>
          ruleGroup.name === updatedRuleGroup.oldName
            ? { ...ruleGroup, ...updatedRuleGroup }
            : ruleGroup
        )
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
    case ActionTypes.OUTPUT_FOR_RULE_VALIDATION: {
      return {
        ...state,
        outputForRule: action.payload
      };
    }
    default:
      return state;
  }
};

export default RulesReducer;
