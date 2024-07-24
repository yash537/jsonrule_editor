import * as ActionTypes from "../actionTypes/action-type";
import { sendNotification, updateState } from "./app";
import {
  FETCH_RULE_FAILURE,
  FETCH_RULE_SUCCESS,
  CREATE_RULE,
  UPDATE_RULE
} from "../actionTypes/action-type";
import {
  createRuleApi,
  createTree,
  DeleteRuleApi,
  fetchRuleConditions,
  fetchRulesbyRuleGroupName,
  saveFactsKeyValuePerRuleApi,
  updateRuleApi
} from "../apis/rule";
import {
  CREATE_RULE_SUCCESS,
  DELETE_RULE_SUCCESS,
  MANAGE_TREE_SUCCESS,
  OUTPUT_FOR_RULE_GROUP_SUCCESS,
  UPDATE_RULE_SUCCESS
} from "../../constants/messages";

export const uploadRuleset = (ruleset) => (dispatch) => {
  dispatch(updateState("open"));
  return dispatch({
    type: ActionTypes.UPLOAD_RULESET,
    payload: { ruleset }
  });
};

export const addRuleset = (name) => (dispatch) => {
  dispatch(updateState("open"));
  return dispatch({
    type: ActionTypes.ADD_RULESET,
    payload: { name }
  });
};

export const updateCurrentRuleName = (name) => (dispatch) => {
  dispatch(updateState("open"));
  return dispatch({
    type: ActionTypes.UPDTAE_RULE_NAME,
    payload: { name }
  });
};

export const updateRulesetIndex = (name) => {
  return {
    type: ActionTypes.UPDATE_RULESET_INDEX,
    payload: { name }
  };
};

export const fetchRulesSuccess = (Rules) => ({
  type: FETCH_RULE_SUCCESS,
  payload: Rules
});

export const fetchRulesFailure = (error) => ({
  type: FETCH_RULE_FAILURE,
  payload: error
});

export const addrule = (rule) => {
  return { type: CREATE_RULE, payload: rule };
};

export const editrule = (rule) => {
  return { type: UPDATE_RULE, payload: rule };
};

export const removeRule = (rule) => {
  return { type: ActionTypes.DELETE_RULE, payload: rule };
};

export const resetRules = () => async (dispatch) => {
  return { type: ActionTypes.RESET_RULES };
};

export const loadRules = (name) => async (dispatch) => {
  try {
    const Rules = await fetchRulesbyRuleGroupName(name);
    dispatch(fetchRulesSuccess(Rules));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const createrule = (data) => async (dispatch) => {
  try {
    const rule = await createRuleApi(data);
    dispatch(addrule(rule));
    dispatch(sendNotification(CREATE_RULE_SUCCESS));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const updaterule = (data) => async (dispatch) => {
  try {
    const rule = await updateRuleApi(data);
    dispatch(editrule({ ...rule, oldName: data.name }));
    dispatch(sendNotification(UPDATE_RULE_SUCCESS));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const deleteRule = (data) => async (dispatch) => {
  try {
    await DeleteRuleApi(data);
    dispatch(sendNotification(DELETE_RULE_SUCCESS));
    dispatch(removeRule(data));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const saveTree = (response) => {
  return { type: ActionTypes.SAVE_DECISION_TREE_PER_RULE, payload: response };
};

export const fetchTree = (response) => {
  return { type: ActionTypes.FETCH_DECISION_TREE_PER_RULE, payload: response };
};

export const outputForValidation = (output) => {
  return { type: ActionTypes.OUTPUT_FOR_RULE_VALIDATION, payload: output };
};

export const handleSaveDecisionTree =
  (ruleGroupId, ruleId, treeData) => async (dispatch) => {
    try {
      const response = await createTree(ruleGroupId, ruleId, treeData);
      dispatch(sendNotification(MANAGE_TREE_SUCCESS));
      dispatch(saveTree(response));
    } catch (error) {
      dispatch(fetchRulesFailure(error.message));
    }
  };

export const handleFetchDecisionTree =
  (ruleGroupId, ruleId) => async (dispatch) => {
    try {
      const response = await fetchRuleConditions(ruleGroupId, ruleId);
      dispatch(fetchTree(response));
    } catch (error) {
      dispatch(fetchRulesFailure(error.message));
    }
  };

export const saveFactsKeyValuePerRule =
  (ruleGroup, data) => async (dispatch) => {
    try {
      const output = await saveFactsKeyValuePerRuleApi(ruleGroup, data);
      dispatch(outputForValidation(output));
      dispatch(sendNotification(OUTPUT_FOR_RULE_GROUP_SUCCESS));
    } catch (error) {
      dispatch(
        sendNotification({
          message: error.response.data.description,
          type: "error"
        })
      );
      dispatch(fetchRulesFailure(error.message));
    }
  };
