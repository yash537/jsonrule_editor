/* eslint-disable default-case */
import {
  CREATE_KEY_SUCCESS,
  DELETE_KEY_SUCCESS,
  UPDATE_KEY_SUCCESS
} from "../../constants/messages";
import * as ActionTypes from "../actionTypes/action-type";
import {
  assignKeysToRule,
  createKeyApi,
  deleteKeyApi,
  fetchKeysApi,
  fetchKeysPerRuleApi,
  handleRemoveKeyFromRuleApi,
  updateKeyApi
} from "../apis/key";
import { sendNotification } from "./app";

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

export const deleteKey = (key) => {
  return { type: ActionTypes.DELETE_KEY, payload: key };
};

export const fetchKeyPerRule = (keys) => ({
  type: ActionTypes.FETCH_KEYS_PER_RULE,
  payload: keys
});

export const deleteKeyFromRule = (key) => ({
  type: ActionTypes.DELETE_KEY_FROM_RULE,
  payload: key
});

export const handlefetchKeys = () => async (dispatch) => {
  try {
    const keys = await fetchKeysApi();
    dispatch(fetchKeys(keys));
  } catch (error) {
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
    dispatch(keyFailuer(error.message));
  }
};

export const handleKey = (action, key, index) => async (dispatch) => {
  switch (action) {
    case "ADD": {
      try {
        const response = await createKeyApi(key);
        dispatch(addKey(response));
        dispatch(sendNotification(CREATE_KEY_SUCCESS));
      } catch (error) {
        dispatch(keyFailuer(error.message));
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
        await updateKeyApi(key, index);
        dispatch(updateKey(key, index));
        dispatch(sendNotification(UPDATE_KEY_SUCCESS));
      } catch (error) {
        dispatch(keyFailuer(error.message));
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
        await deleteKeyApi(key);
        dispatch(deleteKey(key));
        dispatch(sendNotification(DELETE_KEY_SUCCESS));
      } catch (error) {
        dispatch(keyFailuer(error.message));
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

export const loadKeysPerRule = (ruleId) => async (dispatch) => {
  try {
    const keys = await fetchKeysPerRuleApi(ruleId);
    dispatch(fetchKeyPerRule(keys));
  } catch (error) {
    dispatch(keyFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const addKeyToRuleName = (ruleId, key) => async (dispatch) => {
  try {
    const keys = await assignKeysToRule(ruleId, key);
    dispatch(fetchKeyPerRule(keys));
  } catch (error) {
    dispatch(keyFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const handleRemoveKeyFromRule = (ruleId, key) => async (dispatch) => {
  try {
    await handleRemoveKeyFromRuleApi(ruleId, key);
    dispatch(deleteKeyFromRule(key));
  } catch (error) {
    dispatch(keyFailuer(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};
