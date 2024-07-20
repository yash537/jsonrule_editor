import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  keys: [],
  keysPerRule: []
};

const KeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_KEY:
      return {
        ...state,
        keys: state.keys.concat(action.payload)
      };
    case ActionTypes.UPDATE_KEY: {
      const { index, key } = action.payload;
      return {
        ...state,
        keys: [key, ...state.keys.filter((key) => key.id !== index)]
      };
    }
    case ActionTypes.DELETE_KEY: {
      return {
        ...state,
        keys: state.keys.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }
    case ActionTypes.FETCH_KEYS: {
      return {
        ...state,
        keys: action.payload,
        error: null
      };
    }
    case ActionTypes.FETCH_KEYS_PER_RULE: {
      return {
        ...state,
        keysPerRule: action.payload,
        error: null
      };
    }
    case ActionTypes.DELETE_KEY_FROM_RULE: {
      return {
        ...state,
        keysPerRule: state.keysPerRule.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }
    default:
      return state;
  }
};

export default KeyReducer;
