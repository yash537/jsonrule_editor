import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  attributes: []
};

const FactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FACT:
      console.log("zxczxczxc", action.payload);
      return {
        ...state,
        attributes: state.attributes.concat(action.payload)
      };
    default:
      return state;
  }
};

export default FactReducer;
