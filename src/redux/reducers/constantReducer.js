import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  constants: [],
  error: null,
  constantsPerRule: []
};

const ConstantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CONSTANT:
      return {
        ...state,
        constants: state.constants.concat(action.payload)
      };
    case ActionTypes.UPDATE_CONSTANT: {
      const { index, attribute } = action.payload;
      return {
        ...state,
        constants: [
          attribute,
          ...state.constants.filter((attribute) => attribute.id !== index)
        ]
      };
    }
    case ActionTypes.FETCH_CONSTANTS_PER_RULE: {
      return {
        ...state,
        constantsPerRule: action.payload,
        error: null
      };
    }
    case ActionTypes.DELETE_CONSTANT: {
      return {
        ...state,
        constants: state.constants.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }
    case ActionTypes.FETCH_CONSTANTS: {
      return {
        ...state,
        constants: action.payload,
        error: null
      };
    }
    case ActionTypes.DELETE_CONST_FROM_RULE: {
      return {
        ...state,
        constantsPerRule: state.constantsPerRule.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }
    default:
      return state;
  }
};

export default ConstantReducer;
