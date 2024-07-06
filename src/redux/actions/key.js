/* eslint-disable default-case */
import * as ActionTypes from "../actionTypes/action-type";
import { createKeyApi, fetchKeysApi, updateKeyApi } from "../apis/key";

export const addKey = (constant) => {
  return { type: ActionTypes.ADD_KEY, payload: constant };
};

export const keyFailuer = (error) => ({
  type: ActionTypes.FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const updateKey = (constant, index) => {
  const payload = { constant, index };
  return { type: ActionTypes.UPDATE_KEY, payload };
};

export const fetchKeys = (constants) => ({
  type: ActionTypes.FETCH_KEYS,
  payload: constants
});

// export const remove = (constant, index) => {
//   const payload = { constant, index };

//   return { type: ActionTypes.REMOVE_constant, payload };
// };

// export const reset = () => {
//   return { type: ActionTypes.RESET_constant };
// };

export const handlefetchKeys = () => async (dispatch) => {
  try {
    const keys = await fetchKeysApi();
    dispatch(fetchKeys(keys));
  } catch (error) {
    dispatch(keyFailuer(error.message));
  }
};

export const handleKey = (action, key, index) => async (dispatch) => {
  switch (action) {
    case "ADD": {
      try {
        const response = await createKeyApi(key);
        dispatch(addKey(response));
      } catch (error) {
        dispatch(keyFailuer(error.message));
      }
      break; // Add this break statement
    }
    case "UPDATE": {
      try {
        await updateKeyApi(key, index);
        dispatch(updateKey(key, index));
      } catch (error) {
        dispatch(keyFailuer(error.message));
      }
      break; // Add this break statement
    }
    default:
      break; // Optional, but good practice to have a default case
  }
};
