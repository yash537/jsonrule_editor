import { SET_NOTIFICATION, UPDATE_NAV_STATE } from "../actionTypes/action-type";

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
