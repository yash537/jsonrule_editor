/* eslint-disable default-case */
import * as ActionTypes from "../actionTypes/action-type";
import {
  createConstantApi,
  fetchConstantsApi,
  updateconstantApi
} from "../apis/constant";

export const addConstant = (constant) => {
  return { type: ActionTypes.ADD_CONSTANT, payload: constant };
};

export const constantFailuer = (error) => ({
  type: ActionTypes.FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const updateConstant = (constant, index) => {
  const payload = { constant, index };
  return { type: ActionTypes.UPDATE_CONSTANT, payload };
};

export const fetchConstants = (constants) => ({
  type: ActionTypes.FETCH_CONSTANTS,
  payload: constants
});

// export const remove = (constant, index) => {
//   const payload = { constant, index };

//   return { type: ActionTypes.REMOVE_constant, payload };
// };

// export const reset = () => {
//   return { type: ActionTypes.RESET_constant };
// };

export const handleFetchConstants = () => async (dispatch) => {
  try {
    const constants = await fetchConstantsApi();
    dispatch(fetchConstants(constants));
  } catch (error) {
    dispatch(constantFailuer(error.message));
  }
};

export const handleConstant = (action, constant, index) => async (dispatch) => {
  switch (action) {
    case "ADD": {
      try {
        const response = await createConstantApi(constant);
        dispatch(addConstant(response));
      } catch (error) {
        dispatch(constantFailuer(error.message));
      }
      break; // Add this break statement
    }
    case "UPDATE": {
      try {
        await updateconstantApi(constant, index);
        dispatch(updateConstant(constant, index));
      } catch (error) {
        dispatch(constantFailuer(error.message));
      }
      break; // Add this break statement
    }
    default:
      break; // Optional, but good practice to have a default case
  }
};
