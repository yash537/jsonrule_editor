import {
  SET_NOTIFICATION,
  UPDATE_NAV_STATE,
  FETCH_OPRETORS,
  FETCH_TYPES,
  FETCH_COMMON_FAILUER
} from "../actionTypes/action-type";
import { fetchOperatorApi, fetchTypesApi } from "../apis/common";

export function updateState(flag) {
  return {
    type: UPDATE_NAV_STATE,
    payload: { flag }
  };
}

export function sendNotification(payload) {
  return {
    type: SET_NOTIFICATION,
    payload
  };
}

export const fetchTypes = (types) => ({
  type: FETCH_TYPES,
  payload: types
});

export const fetchOperators = (operators) => ({
  type: FETCH_OPRETORS,
  payload: operators
});

export const fetchFailuer = (error) => ({
  type: FETCH_COMMON_FAILUER,
  payload: error
});

export const handleFetchDataTypes = () => async (dispatch) => {
  try {
    const types = await fetchTypesApi();
    dispatch(fetchTypes(types));
  } catch (error) {
    dispatch(fetchFailuer(error.message));
  }
};

export const handleFetchOperators = () => async (dispatch) => {
  try {
    const operators = await fetchOperatorApi();
    dispatch(fetchOperators(operators));
  } catch (error) {
    dispatch(fetchFailuer(error.message));
  }
};
