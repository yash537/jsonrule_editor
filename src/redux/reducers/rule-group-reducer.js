import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  ruleGroups: [],
  ruleGroupFacts: [],
  error: null,
  outputForRuleGroup: []
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
    case ActionTypes.UPDATE_RULE_GROUP: {
      const updatedRuleGroup = action.payload;
      return {
        ...state,
        ruleGroups: state.ruleGroups.map((ruleGroup) =>
          ruleGroup.name === updatedRuleGroup.oldName
            ? { ...ruleGroup, ...updatedRuleGroup }
            : ruleGroup
        )
      };
    }
    case ActionTypes.DELETE_RULE_GROUP: {
      const updatedRuleGroup = action.payload;
      return {
        ...state,
        ruleGroups: state.ruleGroups.filter(
          (ruleGroup) => ruleGroup.name != updatedRuleGroup
        )
      };
    }
    case ActionTypes.FETCH_FACTS_FOR_RULE_GROUP:
      return {
        ...state,
        ruleGroupFacts: action.payload,
        error: null
      };
    case ActionTypes.OUTPUT_FOR_RULE_GROUP_VALIDATION: {
      return {
        ...state,
        outputForRuleGroup: action.payload
      };
    }
    case ActionTypes.RESET_RULE_GROUPS:
      return {
        ...state,
        ruleGroups: [],
        ruleGroupFacts: [],
        error: null,
        outputForRuleGroup: []
      };
    default:
      return state;
  }
};

export default RuleGroupReducer;
