import { UPDATE_NAV_STATE } from "../actionTypes/action-type";

const initialState = {
  navState: "open"
};

const AppReducer = (state = initialState, action) => {
  const type = action.type;
  switch (type) {
    case UPDATE_NAV_STATE: {
      let nav = "closed";
      if (action.payload && action.payload.flag === "open") {
        nav = "open";
      }
      return { ...state, navState: nav };
    }
    default:
      return state;
  }
};

export default AppReducer;
