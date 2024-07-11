import * as ActionTypes from "../actionTypes/action-type";
import { updateState } from "./app";

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

import {
  FETCH_RULE_FAILURE,
  FETCH_RULE_SUCCESS,
  CREATE_RULE,
  UPDATE_RULE
} from "../actionTypes/action-type";
import { fetchRulesbyRuleGroupName } from "../apis/rule";

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

// export const createrule = (data) => async (dispatch) => {
//   try {
//     const rule = await createruleApi(data);
//     dispatch(addrule(rule));
//   } catch (error) {
//     dispatch(fetchRulesFailure(error.message));
//   }
// };

// export const updaterule = (data) => async (dispatch) => {
//   try {
//     const rule = await updateruleApi(data);
//     dispatch(editrule({ ...rule, oldName: data.name }));
//   } catch (error) {
//     dispatch(fetchRulesFailure(error.message));
//   }
// };
