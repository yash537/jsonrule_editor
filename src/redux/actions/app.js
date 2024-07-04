import { UPDATE_NAV_STATE } from "../actionTypes/action-type";

export function updateState(flag) {
  return {
    type: UPDATE_NAV_STATE,
    payload: { flag }
  };
}
