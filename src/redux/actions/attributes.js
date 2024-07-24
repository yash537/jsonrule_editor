/* eslint-disable default-case */
import * as ActionTypes from "../actionTypes/action-type";
import {
  fetchFactsPerRuleApi,
  handleRemoveAttrFromRuleApi
} from "../apis/fact";
import { sendNotification } from "./app";

export const add = (attribute) => {
  const payload = { attribute };
  return { type: ActionTypes.ADD_ATTRIBUTE, payload };
};

export const attributeFailuer = (error) => ({
  type: ActionTypes.FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const update = (attribute, index) => {
  const payload = { attribute, index };

  return { type: ActionTypes.UPDATE_ATTRIBUTE, payload };
};

export const remove = (attribute, index) => {
  const payload = { attribute, index };

  return { type: ActionTypes.REMOVE_ATTRIBUTE, payload };
};

export const reset = () => {
  return { type: ActionTypes.RESET_ATTRIBUTE };
};

export const fetchFactsPerRuleSuccess = (ruleId) => {
  return { type: ActionTypes.FETCH_FACTS_PER_RULE, payload: ruleId };
};

export const handleAttribute = (action, attribute, index) => (dispatch) => {
  switch (action) {
    case "ADD":
      return dispatch(add(attribute));
    case "UPDATE":
      return dispatch(update(attribute, index));
    case "REMOVE":
      return dispatch(remove(attribute, index));
    case "RESET":
      return dispatch(reset());
  }
};

export const deleteFactFromRule = (fact) => ({
  type: ActionTypes.DELETE_FACT_FROM_RULE,
  payload: fact
});

export const loadFactsPerRule = (ruleId) => async (dispatch) => {
  try {
    const facts = await fetchFactsPerRuleApi(ruleId);
    dispatch(fetchFactsPerRuleSuccess(facts));
  } catch (error) {
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
    dispatch(attributeFailuer(error.message));
  }
};

export const handleRemoveAttrFromRule = (ruleId, fact) => async (dispatch) => {
  try {
    const facts = await handleRemoveAttrFromRuleApi(ruleId, fact);
    dispatch(fetchFactsPerRuleSuccess(facts));
  } catch (error) {
    dispatch(attributeFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};
