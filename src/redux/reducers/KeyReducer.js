import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  keys: []
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
    default:
      return state;
  }
};

export default KeyReducer;
