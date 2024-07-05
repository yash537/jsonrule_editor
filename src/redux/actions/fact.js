/* eslint-disable default-case */
import * as ActionTypes from "../actionTypes/action-type";
import { createFactApi, fetchFactsApi, updateFactApi } from "../apis/fact";

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

export const fetchFacts = (attributes) => ({
  type: ActionTypes.FETCH_FACTS,
  payload: attributes
});

// export const remove = (attribute, index) => {
//   const payload = { attribute, index };

//   return { type: ActionTypes.REMOVE_ATTRIBUTE, payload };
// };

// export const reset = () => {
//   return { type: ActionTypes.RESET_ATTRIBUTE };
// };

export const handleFetchFacts = () => async (dispatch) => {
  try {
    const facts = await fetchFactsApi();
    dispatch(fetchFacts(facts));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
  }
};

export const handleFact = (action, fact, index) => async (dispatch) => {
  switch (action) {
    case "ADD": {
      try {
        const response = await createFactApi(fact);
        dispatch(addFact(response));
      } catch (error) {
        dispatch(factFailuer(error.message));
      }
      break; // Add this break statement
    }
    case "UPDATE": {
      try {
        await updateFactApi(fact, index);
        dispatch(updateFact(fact, index));
      } catch (error) {
        dispatch(factFailuer(error.message));
      }
      break; // Add this break statement
    }
    default:
      break; // Optional, but good practice to have a default case
  }
};
