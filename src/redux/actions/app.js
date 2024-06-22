import { UPDATE_NAV_STATE, LOG_IN } from "../actionTypes/action-type";

export function updateState(flag) {
  return {
    type: UPDATE_NAV_STATE,
    payload: { flag },
  };
}

export function login() {
  return {
    type: LOG_IN,
  };
}
