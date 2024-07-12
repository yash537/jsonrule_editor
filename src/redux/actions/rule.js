import * as ActionTypes from "../actionTypes/action-type";
import { updateState } from "./app";
import {
  FETCH_RULE_FAILURE,
  FETCH_RULE_SUCCESS,
  CREATE_RULE,
  UPDATE_RULE
} from "../actionTypes/action-type";
import {
  createRuleApi,
  DeleteRuleApi,
  fetchRulesbyRuleGroupName,
  updateRuleApi
} from "../apis/rule";

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
  dispatch(fetchRulesSuccess([]));
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
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const updaterule = (data) => async (dispatch) => {
  try {
    const rule = await updateRuleApi(data);
    dispatch(editrule({ ...rule, oldName: data.name }));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};

export const deleteRule = (data) => async (dispatch) => {
  try {
    await DeleteRuleApi(data);
    dispatch(removeRule(data));
  } catch (error) {
    dispatch(fetchRulesFailure(error.message));
  }
};
