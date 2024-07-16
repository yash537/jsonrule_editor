import { SET_NOTIFICATION, UPDATE_NAV_STATE } from "../actionTypes/action-type";

const initialState = {
  navState: "open",
  notification: {
    message: "",
    type: ""
  }
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
    case SET_NOTIFICATION: {
      return {
        ...state,
        notification: {
          message: action.payload.message,
          type: action.payload.type
        }
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
