/* eslint-disable default-case */
import {
  CREATE_CONSTANT_SUCCESS,
  DELETE_CONSTANT_SUCCESS,
  UPDATE_CONSTANT_SUCCESS
} from "../../constants/messages";
import * as ActionTypes from "../actionTypes/action-type";
import {
  assignConstantsToRule,
  createConstantApi,
  deleteConstantApi,
  fetchConstantsApi,
  fetchConstantsPerRuleApi,
  handleRemoveConstantFromRuleApi,
  updateconstantApi
} from "../apis/constant";
import { sendNotification } from "./app";

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

export const deleteConstant = (constant) => {
  return { type: ActionTypes.DELETE_CONSTANT, payload: constant };
};

export const fetchConstants = (constants) => ({
  type: ActionTypes.FETCH_CONSTANTS,
  payload: constants
});

export const fetchConstantPerRule = (constants) => ({
  type: ActionTypes.FETCH_CONSTANTS_PER_RULE,
  payload: constants
});

export const loadConstantsPerRule = (ruleId) => async (dispatch) => {
  try {
    const facts = await fetchConstantsPerRuleApi(ruleId);
    dispatch(fetchConstantPerRule(facts));
  } catch (error) {
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
    dispatch(constantFailuer(error.message));
  }
};

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
        dispatch(sendNotification(CREATE_CONSTANT_SUCCESS));
      } catch (error) {
        dispatch(constantFailuer(error.message));
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
        await updateconstantApi(constant, index);
        dispatch(sendNotification(UPDATE_CONSTANT_SUCCESS));
        dispatch(updateConstant(constant, index));
      } catch (error) {
        dispatch(constantFailuer(error.message));
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
        await deleteConstantApi(constant);
        dispatch(sendNotification(DELETE_CONSTANT_SUCCESS));
        dispatch(deleteConstant(constant));
      } catch (error) {
        dispatch(constantFailuer(error.message));
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

export const deleteConstFromRule = (constant) => ({
  type: ActionTypes.DELETE_CONST_FROM_RULE,
  payload: constant
});

export const addConstantToRuleName = (ruleId, constant) => async (dispatch) => {
  try {
    const constants = await assignConstantsToRule(ruleId, constant);
    dispatch(fetchConstantPerRule(constants));
  } catch (error) {
    dispatch(constantFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const handleRemoveConstantFromRule =
  (ruleId, key) => async (dispatch) => {
    try {
      await handleRemoveConstantFromRuleApi(ruleId, key);
      dispatch(deleteConstFromRule(key));
    } catch (error) {
      dispatch(constantFailuer(error.message));
      dispatch(
        sendNotification({
          message: error.response.data.description,
          type: "error"
        })
      );
    }
  };
