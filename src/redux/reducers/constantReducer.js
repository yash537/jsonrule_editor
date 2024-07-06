import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  constants: []
};

const ConstantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FACT:
      return {
        ...state,
        constants: state.constants.concat(action.payload)
      };
    case ActionTypes.UPDATE_FACT: {
      const { index, attribute } = action.payload;
      return {
        ...state,
        constants: [
          attribute,
          ...state.constants.filter((attribute) => attribute.id !== index)
        ]
      };
    }
    case ActionTypes.FETCH_FACTS: {
      return {
        ...state,
        constants: action.payload,
        error: null
      };
    }
    default:
      return state;
  }
};

export default ConstantReducer;
