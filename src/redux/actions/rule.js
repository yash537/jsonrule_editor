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
  console.log(name);
  return {
    type: ActionTypes.UPDATE_RULESET_INDEX,
    payload: { name }
  };
};
