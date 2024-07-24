/* eslint-disable default-case */
import {
  CREATE_FACT_SUCCESS,
  DELETE_FACT_SUCCESS,
  UPDATE_FACT_SUCCESS
} from "../../constants/messages";
import * as ActionTypes from "../actionTypes/action-type";
import {
  assignFactsToRule,
  createFactApi,
  deleteFactApi,
  fetchFactsApi,
  updateFactApi
} from "../apis/fact";
import { sendNotification } from "./app";

export const addFact = (attribute) => {
  return { type: ActionTypes.ADD_FACT, payload: attribute };
};

export const factFailuer = (error) => ({
  type: ActionTypes.FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const updateFact = (attribute, index) => {
  const payload = { attribute, index };
  return { type: ActionTypes.UPDATE_FACT, payload };
};

export const deleteFact = (fact) => {
  return { type: ActionTypes.DELETE_FACT, payload: fact };
};

export const fetchFacts = (attributes) => ({
  type: ActionTypes.FETCH_FACTS,
  payload: attributes
});

export const fetchFactPerRule = (attributes) => ({
  type: ActionTypes.FETCH_FACTS_PER_RULE,
  payload: attributes
});

export const handleFetchFacts = () => async (dispatch) => {
  try {
    const facts = await fetchFactsApi();
    dispatch(fetchFacts(facts));
  } catch (error) {
    dispatch(factFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const handleFetchFactsPerRule = (ruleId) => async (dispatch) => {
  try {
    const facts = await fetchFactsPerRuleApi(ruleId);
    dispatch(fetchFactPerRule(facts));
  } catch (error) {
    dispatch(factFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const addFactToRuleName = (ruleId, fact) => async (dispatch) => {
  try {
    const facts = await assignFactsToRule(ruleId, fact);
    dispatch(fetchFactPerRule(facts));
  } catch (error) {
    dispatch(factFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const handleFact = (action, fact, index) => async (dispatch) => {
  switch (action) {
    case "ADD": {
      try {
        const response = await createFactApi(fact);
        dispatch(addFact(fact));
        dispatch(sendNotification(CREATE_FACT_SUCCESS));
      } catch (error) {
        dispatch(factFailuer(error.message));
        dispatch(
          sendNotification({
            message: error.response.data.description,
            type: "error"
          })
        );
      }
      break; // Add this break statement
    }
    case "UPDATE": {
      try {
        await updateFactApi(fact, index);
        dispatch(updateFact(fact, index));
        dispatch(sendNotification(UPDATE_FACT_SUCCESS));
      } catch (error) {
        dispatch(factFailuer(error.message));
        dispatch(
          sendNotification({
            message: error.response.data.description,
            type: "error"
          })
        );
      }
      break; // Add this break statement
    }
    case "DELETE": {
      try {
        await deleteFactApi(fact);
        dispatch(deleteFact(fact));
        dispatch(sendNotification(DELETE_FACT_SUCCESS));
      } catch (error) {
        dispatch(factFailuer(error.message));
        dispatch(
          sendNotification({
            message: error.response.data.description,
            type: "error"
          })
        );
      }
      break; // Add this break statement
    }
    default:
      break; // Optional, but good practice to have a default case
  }
};
