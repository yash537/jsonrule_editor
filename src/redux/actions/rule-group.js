import { createRuleGroupApi, fetchRuleGroups } from "../apis/rule-group";
import {
  FETCH_RULE_GROUPS_SUCCESS,
  FETCH_RULE_GROUPS_FAILURE,
  CREATE_RULE_GROUP
} from "../actionTypes/action-type";

export const fetchRuleGroupsSuccess = (ruleGroups) => ({
  type: FETCH_RULE_GROUPS_SUCCESS,
  payload: ruleGroups
});

export const fetchRuleGroupsFailure = (error) => ({
  type: FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const addRuleGroup = (ruleGroup) => {
  return { type: CREATE_RULE_GROUP, payload: ruleGroup };
};

export const loadRuleGroups = () => async (dispatch) => {
  try {
    const ruleGroups = await fetchRuleGroups();
    dispatch(fetchRuleGroupsSuccess(ruleGroups));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
  }
};

export const createRuleGroup = (title) => async (dispatch) => {
  try {
    const ruleGroup = await createRuleGroupApi(title);
    dispatch(addRuleGroup(ruleGroup));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
  }
};
