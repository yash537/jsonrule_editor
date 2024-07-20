import {
  FETCH_OPRETORS,
  FETCH_TYPES,
  SET_NOTIFICATION,
  UPDATE_NAV_STATE
} from "../actionTypes/action-type";

const initialState = {
  navState: "open",
  notification: {
    message: "",
    type: ""
  },
  dataTypes: [],
  operators: []
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
    case FETCH_TYPES: {
      return {
        ...state,
        dataTypes: action.payload
      };
    }
    case FETCH_OPRETORS: {
      return {
        ...state,
        operators: action.payload
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
